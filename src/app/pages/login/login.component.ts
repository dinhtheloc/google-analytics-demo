import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { QuicklinkDirective } from 'ngx-quicklink'

@Component({
    standalone: true,
    imports: [RouterLink, QuicklinkDirective],
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {}
