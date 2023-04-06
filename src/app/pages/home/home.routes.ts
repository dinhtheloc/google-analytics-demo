import { Routes } from '@angular/router'
import { HomeComponent } from './home.component'
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'src/app/services/recaptcha-v3.service'

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,

        providers: [
            ReCaptchaV3Service,
            {
                provide: RECAPTCHA_V3_SITE_KEY,
                useValue: '6Lc8IDUlAAAAANQ92hpn3mAhg9VGdcV9AdH-r0ON',
            },
        ],

    
    },
]
