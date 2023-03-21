import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { ShareDataService } from 'src/app/services/share-data.service'

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [NgIf, AsyncPipe],
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    isLoading$ = this.shareDataService.isLoading$
    constructor(private shareDataService: ShareDataService) {}
}
