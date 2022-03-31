import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RejectionReasonComponent } from './rejection-reason.component';


const routes: Routes = [
  { path: '', component:RejectionReasonComponent}
];
@NgModule({
  declarations: [RejectionReasonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class RejectionReasonModule { }
