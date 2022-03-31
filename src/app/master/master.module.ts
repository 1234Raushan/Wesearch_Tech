import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MasterComponent } from './master.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component:MasterComponent}
];

@NgModule({
  declarations: [MasterComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,ReactiveFormsModule
  ]
})
export class MasterModule { }
