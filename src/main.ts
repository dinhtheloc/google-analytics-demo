import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter, withPreloading } from '@angular/router'
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink'
import { AppComponent } from './app/app.component'
import { routes } from './app/routes'

bootstrapApplication(AppComponent, {
    providers: [
        quicklinkProviders,
        provideRouter(routes, withPreloading(QuicklinkStrategy)),
        // importProvidersFrom(RouterModule.forRoot(routes))
    ],
}).catch((err) => console.error(err))
