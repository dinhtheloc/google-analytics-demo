import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    selector: 'app-centered-content-layout',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './centered-content-layout.component.html',
    styleUrls: ['./centered-content-layout.component.scss'],
})
export class CenteredContentLayoutComponent {}
