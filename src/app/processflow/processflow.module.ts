import { NgModule } from '@angular/core';
import { ProcessflowComponent } from './processflow.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component:ProcessflowComponent}
];

@NgModule({
  declarations: [ProcessflowComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProcessflowModule {
  constructor(){
  }
}
