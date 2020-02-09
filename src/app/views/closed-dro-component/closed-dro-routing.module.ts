import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClosedDroComponent } from './closed-dro.component';

const routes: Routes = [{
  path: '',
  component: ClosedDroComponent,
  data: {
    title: 'ClosedDro'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosedDroRoutingModule { }
