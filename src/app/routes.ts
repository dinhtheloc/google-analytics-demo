import { Routes } from '@angular/router'
import { CenteredContentLayoutComponent } from './layouts/centered-content-layout/centered-content-layout.component'
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component'

export const routes: Routes = [
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
    // {
    //     path: 'post',
    //     loadChildren: () =>
    //         import('./pages/index/index.module').then((m) => m.IndexModule),
    // },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]
