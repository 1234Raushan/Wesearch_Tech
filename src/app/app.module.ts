import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { NewStageComponent } from './Production/new-stage/new-stage.component';
import { NewProcessFlowComponent } from './Production/new-process-flow/new-process-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProcessFlowComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened: 1, newestOnTop: true, preventDuplicates: true, autoDismiss: true,
      tapToDismiss: false,
    }),
    NgxDatatableModule
  ],
  providers: [AuthGuard,Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  //  exports:[SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
