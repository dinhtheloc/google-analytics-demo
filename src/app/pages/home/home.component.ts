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
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha'
import { QuicklinkDirective } from 'ngx-quicklink'
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service'

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
        RecaptchaV3Module,
        ReactiveFormsModule,
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
    public executeImportantAction(): void {
        // this.recaptchaV3Service
        //     .execute('importantAction')
        //     .subscribe(console.log)
    }

    submit() {
        this.googleAnalyticsService.eventEmitter('intro.register', {
            value: 'click',
            phoneNumber: this.form.value.phoneNumber,
        })
    }
}
