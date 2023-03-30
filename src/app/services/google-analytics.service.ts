import { Injectable } from '@angular/core'
declare let gtag: Function;
@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    public eventEmitter(
        action: string,
        eventParams: any
    ) {
        gtag('event', action, eventParams)
    }
}
