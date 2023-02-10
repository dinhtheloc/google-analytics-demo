import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditComponent } from './components/edit/edit.component'
import { ViewComponent } from './components/view/view.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PostRoutingModule } from './post-routing.module'
import { CreateComponent } from './components/create/create.component'

@NgModule({
    declarations: [EditComponent, ViewComponent, CreateComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PostRoutingModule,
    ],
})
export class IndexModule {}
