import { Routes } from '@angular/router'
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha'
import { HomeComponent } from './home.component'

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,

        providers: [
            {
                provide: RECAPTCHA_V3_SITE_KEY,
                useValue: '6Lc8IDUlAAAAANQ92hpn3mAhg9VGdcV9AdH-r0ON',
            },
        ],
    },
]
