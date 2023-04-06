import { isPlatformBrowser } from '@angular/common'
import {
    Inject,
    Injectable,
    NgZone,
    Optional,
    PLATFORM_ID,
} from '@angular/core'
import { Observable, Subject } from 'rxjs'

import { InjectionToken } from '@angular/core'

interface RecaptchaSettings {
    siteKey?: string
    theme?: ReCaptchaV2.Theme
    type?: ReCaptchaV2.Type
    size?: ReCaptchaV2.Size
    badge?: ReCaptchaV2.Badge
}

export interface OnExecuteData {
    /**
     * The name of the action that has been executed.
     */
    action: string
    /**
     * The token that reCAPTCHA v3 provided when executing the action.
     */
    token: string
}

export interface OnExecuteErrorData {
    /**
     * The name of the action that has been executed.
     */
    action: string
    /**
     * The error which was encountered
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
}

export const RECAPTCHA_LANGUAGE = new InjectionToken<string>(
    'recaptcha-language'
)
export const RECAPTCHA_BASE_URL = new InjectionToken<string>(
    'recaptcha-base-url'
)
export const RECAPTCHA_NONCE = new InjectionToken<string>('recaptcha-nonce-tag')
export const RECAPTCHA_SETTINGS = new InjectionToken<RecaptchaSettings>(
    'recaptcha-settings'
)
export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>(
    'recaptcha-v3-site-key'
)

declare global {
    interface Window {
        ng2recaptchaloaded: () => void
    }
}

function loadScript(
    renderMode: 'explicit' | string,
    onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
    urlParams: string,
    url?: string,
    nonce?: string
): void {
    window.ng2recaptchaloaded = () => {
        onLoaded(grecaptcha)
    }
    const script = document.createElement('script')
    script.innerHTML = ''
    const baseUrl = url || 'https://www.google.com/recaptcha/api.js'

    script.src = `${baseUrl}?render=${renderMode}&onload=ng2recaptchaloaded${urlParams}`
    if (nonce) {
        script.nonce = nonce
    }
    script.async = true
    script.defer = true
    document.head.appendChild(script)
}

type ActionBacklogEntry = [string, Subject<string>]

@Injectable()
export class ReCaptchaV3Service {
    /** @internal */
    private readonly isBrowser: boolean
    /** @internal */
    private readonly siteKey: string
    /** @internal */
    private readonly zone: NgZone
    /** @internal */
    private actionBacklog: ActionBacklogEntry[] | undefined
    /** @internal */
    private nonce: string | undefined
    /** @internal */
    private language?: string
    /** @internal */
    private baseUrl: string | undefined
    /** @internal */
    private grecaptcha!: ReCaptchaV2.ReCaptcha
    /** @internal */
    private onExecuteSubject!: Subject<OnExecuteData>
    /** @internal */
    private onExecuteErrorSubject!: Subject<OnExecuteErrorData>
    /** @internal */
    private onExecuteObservable!: Observable<OnExecuteData>
    /** @internal */
    private onExecuteErrorObservable!: Observable<OnExecuteErrorData>

    constructor(
        zone: NgZone,
        @Inject(RECAPTCHA_V3_SITE_KEY) siteKey: string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        @Inject(PLATFORM_ID) platformId: Object,
        @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
        @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
        @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string
    ) {
        this.zone = zone
        this.isBrowser = isPlatformBrowser(platformId)
        this.siteKey = siteKey
        this.nonce = nonce
        this.language = language
        this.baseUrl = baseUrl

        this.init()
    }

    public get onExecute(): Observable<OnExecuteData> {
        if (!this.onExecuteSubject) {
            this.onExecuteSubject = new Subject<OnExecuteData>()
            this.onExecuteObservable = this.onExecuteSubject.asObservable()
        }

        return this.onExecuteObservable
    }

    public get onExecuteError(): Observable<OnExecuteErrorData> {
        if (!this.onExecuteErrorSubject) {
            this.onExecuteErrorSubject = new Subject<OnExecuteErrorData>()
            this.onExecuteErrorObservable =
                this.onExecuteErrorSubject.asObservable()
        }

        return this.onExecuteErrorObservable
    }

    /**
     * Executes the provided `action` with reCAPTCHA v3 API.
     * Use the emitted token value for verification purposes on the backend.
     *
     * For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
     * https://developers.google.com/recaptcha/docs/v3.
     *
     * @param {string} action the action to execute
     * @returns {Observable<string>} an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
     * The returned `Observable` completes immediately after emitting a value.
     */
    public execute(action: string): Observable<string> {
        const subject = new Subject<string>()
        if (this.isBrowser) {
            if (!this.grecaptcha) {
                if (!this.actionBacklog) {
                    this.actionBacklog = []
                }

                this.actionBacklog.push([action, subject])
            } else {
                this.executeActionWithSubject(action, subject)
            }
        }

        return subject.asObservable()
    }

    /** @internal */
    private executeActionWithSubject(
        action: string,
        subject: Subject<string>
    ): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onError = (error: any) => {
            this.zone.run(() => {
                subject.error(error)
                if (this.onExecuteErrorSubject) {
                    // We don't know any better at this point, unfortunately, so have to resort to `any`
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    this.onExecuteErrorSubject.next({ action, error })
                }
            })
        }

        this.zone.runOutsideAngular(() => {
            try {
                this.grecaptcha
                    .execute(this.siteKey, { action })
                    .then((token: string) => {
                        this.zone.run(() => {
                            subject.next(token)
                            subject.complete()
                            if (this.onExecuteSubject) {
                                this.onExecuteSubject.next({ action, token })
                            }
                        })
                    }, onError)
            } catch (e) {
                onError(e)
            }
        })
    }

    /** @internal */
    private init() {
        if (this.isBrowser) {
            if ('grecaptcha' in window) {
                this.grecaptcha = grecaptcha
            } else {
                const langParam = this.language ? '&hl=' + this.language : ''
                loadScript(
                    this.siteKey,
                    this.onLoadComplete,
                    langParam,
                    this.baseUrl,
                    this.nonce
                )
            }
        }
    }

    /** @internal */
    private onLoadComplete = (grecaptcha: ReCaptchaV2.ReCaptcha) => {
        this.grecaptcha = grecaptcha
        if (this.actionBacklog && this.actionBacklog.length > 0) {
            this.actionBacklog.forEach(([action, subject]) =>
                this.executeActionWithSubject(action, subject)
            )
            this.actionBacklog = undefined
        }
    }
}
