import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutsModule } from './layouts/layouts/layouts.module'
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { CrudService } from './services/crud.service';
import { IndexComponent } from './pages/index/index.component'

@NgModule({
    declarations: [AppComponent, IndexComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        LayoutsModule,

        HomeComponent,
        LoginComponent,
        RegisterComponent,


        
    ],
    providers: [CrudService],
    bootstrap: [AppComponent],
})
export class AppModule {}
