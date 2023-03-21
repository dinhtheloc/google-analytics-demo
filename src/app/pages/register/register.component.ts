import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { QuicklinkDirective } from 'ngx-quicklink'

@Component({
    standalone: true,
    imports: [RouterLink, QuicklinkDirective],
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {}
