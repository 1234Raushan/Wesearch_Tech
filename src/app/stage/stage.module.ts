import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StageComponent } from './stage.component';

const routes: Routes = [
  { path: '', component:StageComponent}
];
@NgModule({
  declarations: [StageComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class StageModule {
  constructor(){
  }
}
