import { Injectable } from '@angular/core'
declare let gtag: Gtag.Gtag;
interface CustomParams {
    [key: string]: any;
  }
@Injectable({
    providedIn: 'root',
})
export class GoogleAnalyticsService {
    public eventEmitter(
        eventName: string,
        eventParams: CustomParams
    ) {
        gtag('event', eventName, eventParams)
    }
}
