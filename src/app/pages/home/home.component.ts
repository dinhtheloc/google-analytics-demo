import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { RecaptchaV3Module, ReCaptchaV3Service, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha'
import { QuicklinkDirective } from 'ngx-quicklink'

@Component({
    standalone: true,
    imports: [RouterLink, QuicklinkDirective, RecaptchaV3Module],
     selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    private recaptchaV3Service = inject(ReCaptchaV3Service)

    public executeImportantAction(): void {
        this.recaptchaV3Service.execute('importantAction')
          .subscribe(console.log);
      }
    
}
