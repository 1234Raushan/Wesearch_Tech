import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent ,children:[
    {path: 'stage', loadChildren:()=> import("../stage/stage.module").then(m=>m.StageModule)},
    {path: 'new-stage', loadChildren:()=> import("../Production/new-stage/new-stage.module").then(m=>m.NewStageModule)},
    {path: 'processflow', loadChildren:()=> import("../processflow/processflow.module").then(m=>m.ProcessflowModule)},
    {path: 'new-process-flow', loadChildren:()=> import("../Production/new-process-flow/new-process-flow.module").then(m=>m.NewProcessFlowModule)},
    {path: 'rejection-reason', loadChildren:()=> import("../rejection-reason/rejection-reason.module").then(m=>m.RejectionReasonModule)},
    {path: 'master', loadChildren:()=> import("../master/master.module").then(m=>m.MasterModule)}
  ]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [DashboardComponent]

})

export class DashboardModule {
  constructor(){
  }
 }
