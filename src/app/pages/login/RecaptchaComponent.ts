import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core'
import { RecaptchaModule } from 'ng-recaptcha';
declare const grecaptcha: any;
@Component({
    selector: 'recaptcha',
    template: `
        <re-captcha (resolved)="resolved($event)" siteKey="6LdBPT4lAAAAADqx3B2AFuVW_KjN4w5CoY2i97b6"></re-captcha>
    `,
    standalone: true,
    imports: [HttpClientModule, RecaptchaModule]
})
export class RecaptchaComponent {

    private http = inject(HttpClient);

    constructor() {
        
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
      }
    

    // submit() {
    //     const postData = {
    //         response: this.recaptchaResponse,
    //         secret: '6LdBPT4lAAAAACW-OBpitbiV2xsmLaGcGprrLEYp'
    //     };
        
    //     this.http.post('https://www.google.com/recaptcha/api/siteverify', postData).subscribe((data) => {
    //         console.log(data);
    //     });
    // }
    
}
