import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import {
    RouteConfigLoadEnd,
    RouteConfigLoadStart,
    Router,
    RouterEvent,
    RouterOutlet,
    Event,
    NavigationEnd,
} from '@angular/router'
import { filter } from 'rxjs'
import { LoaderComponent } from './components/loader/loader.component'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { CrudService } from './services/crud.service'
import { ShareDataService } from './services/share-data.service'
declare const gtag: Function; 
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        LoaderComponent,
        MainLayoutComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
    ],
    providers: [
        CrudService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'angular-best-practice'
    private shareDataService = inject(ShareDataService)
    constructor(router: Router) {
        this.shareDataService.setLoading(false)
        router.events.subscribe((e: Event) => {
            // Do something
            if (e instanceof RouteConfigLoadStart) {
                this.shareDataService.setLoading(true)
            } else if (e instanceof RouteConfigLoadEnd) {
                this.shareDataService.setLoading(false)
            } else if (e instanceof NavigationEnd) {
                gtag('event', 'page_view', {
                    page_path: e.urlAfterRedirects,
                })
            }
        })
    }
}
