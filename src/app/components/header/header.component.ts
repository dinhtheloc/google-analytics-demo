import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, QuicklinkDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
