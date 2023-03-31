import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
@Injectable({
    providedIn: 'root',
})
export class FakeService {
    checkRecaptcha(token: string): Observable<any> {
        console.log('call => ', token)
        return of({
            success: true,
            challenge_ts: new Date().getTime(),
            hostname: 'hdsaison-test.netlify.app',
            score: 0.9,
            action: 'importantAction',
        })
    }
}
