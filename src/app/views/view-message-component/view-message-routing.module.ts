import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMessageComponent } from './view-message.component';

const routes: Routes = [{
  path: '',
  component: ViewMessageComponent,
  data: {
    title: 'ViewMessage'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewMessageRoutingModule { }
