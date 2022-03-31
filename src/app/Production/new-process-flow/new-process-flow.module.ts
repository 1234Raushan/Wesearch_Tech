import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewProcessFlowComponent } from './new-process-flow.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component:NewProcessFlowComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NewProcessFlowModule { }
