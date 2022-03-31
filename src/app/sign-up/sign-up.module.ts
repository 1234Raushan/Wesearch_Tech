import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  { path: '', component: SignUpComponent }
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ]
})
export class SignUpModule { }
