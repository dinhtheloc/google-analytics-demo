import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Component } from '@angular/core'
import { RouterModule, RouterOutlet } from '@angular/router'
import { LoaderComponent } from './components/loader/loader.component'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { CrudService } from './services/crud.service'

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
}
