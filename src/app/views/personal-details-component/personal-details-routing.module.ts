import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDetailsComponent } from './personal-details.component';

const routes: Routes = [{
  path: '',
  component: PersonalDetailsComponent,
  data: {
    title: 'PersonalDetails'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDetailsRoutingModule { }
