import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewStageComponent } from './new-stage.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component:NewStageComponent}
];
@NgModule({
  declarations: [NewStageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NewStageModule { }
