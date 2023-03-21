import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CenteredContentLayoutComponent } from './layouts/centered-content-layout/centered-content-layout.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'

const routes: Routes = [
    // {
    //     path: '',
    //     component: CenteredContentLayoutComponent,
    //     children: [
    //         { path: 'login', component: LoginComponent },
    //         { path: 'register', component: RegisterComponent },
    //     ],
    // },
    // {
    //     path: '',
    //     component: MainLayoutComponent,
    //     children: [{ path: 'home', component: HomeComponent }],
    // },
    {
        path: 'home',
        component: MainLayoutComponent,
        loadChildren: () =>
            import('./pages/home/home.routes').then(
                (routes) => routes.homeRoutes
            ),
    },
    {
        path: 'login',
        component: CenteredContentLayoutComponent,
        loadChildren: () =>
            import('./pages/login/login.routes').then(
                (routes) => routes.loginRoutes
            ),
    },
    {
        path: 'register',
        component: CenteredContentLayoutComponent,
        loadChildren: () =>
            import('./pages/register/register.routes').then(
                (routes) => routes.registerRoutes
            ),
    },
    {
        path: 'post',
        loadChildren: () =>
            import('./pages/index/index.module').then((m) => m.IndexModule),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
