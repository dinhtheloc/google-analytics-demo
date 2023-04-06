import { NgClass, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { QuicklinkDirective } from 'ngx-quicklink'
import { mergeMap, tap } from 'rxjs'
import { FakeService } from 'src/app/services/fake.service'
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service'
import { ReCaptchaV3Service } from 'src/app/services/recaptcha-v3.service'

export function PhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
        const phone = control.value
        return phone.match(regexPhoneNumber)
            ? null
            : { wrongNumber: { value: phone } }
    }
}

@Component({
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        RouterLink,
        QuicklinkDirective,
        ReactiveFormsModule 
    ],
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    form: FormGroup = new FormGroup({
        phoneNumber: new FormControl('', [
            Validators.required,
            PhoneNumberValidator(),
        ]),
    })

    get f() {
        return this.form.controls
    }

    private recaptchaV3Service = inject(ReCaptchaV3Service)

    private googleAnalyticsService = inject(GoogleAnalyticsService)
    private fakeService = inject(FakeService)

    public executeImportantAction(): void {
        this.recaptchaV3Service
            .execute('importantAction')
            .pipe(
                mergeMap((token) => this.fakeService.checkRecaptcha(token)),
                tap(() =>
                    this.googleAnalyticsService.eventEmitter('intro_register', {
                        action: 'click',
                        label: 'Submit',
                        phone_number: this.form.value.phoneNumber,
                        dinh_the_loc: 'test',
                        gender: 'female',
                        intro_register: 'test 1'
                    })
                )
            )
            .subscribe((resp) => {
                console.log({ resp })
            })
    }

    submit() {
        this.executeImportantAction()
    }
}
