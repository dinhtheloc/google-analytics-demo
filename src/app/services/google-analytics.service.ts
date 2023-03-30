import { Injectable } from '@angular/core'
declare let gtag: Gtag.Gtag;
@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    public eventEmitter(
        action: Gtag.EventNames | string,
        event_category: string,
        event_label: string,
        value: number
    ) {

        const eventParams: Gtag.EventParams = {
            event_category,
            event_label,
            value
        }
        gtag('event', action, eventParams)
    }
}
