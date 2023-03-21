import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { QuicklinkDirective } from 'ngx-quicklink'

@Component({
    standalone: true,
    imports: [RouterLink, QuicklinkDirective],
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
