import { Injectable } from '@angular/core'
declare let gtag: Function;
@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    public eventEmitter(
        action: Gtag.EventNames | string,
        eventParams: any
    ) {
        gtag('event', action, eventParams)
    }
}
