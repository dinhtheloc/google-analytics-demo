import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ShareDataService {
    data: Subject<boolean> = new Subject<boolean>()

    subject$ = this.data.asObservable()

    isLoading = new BehaviorSubject<boolean>(false)

    isLoading$ = this.isLoading.asObservable()

    constructor() {}

    setData(data: boolean) {
        this.data.next(data)
    }

    setLoading(value: boolean) {
        this.isLoading.next(value)
    }
}
