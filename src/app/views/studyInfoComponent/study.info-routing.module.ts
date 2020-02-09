import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudyInfoComponent } from './study.info.component';

const routes: Routes = [{
  path: '',
  component: StudyInfoComponent,
  data: {
    title: 'Study-Info'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyInfoRoutingModule { }
