import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SanitizeHtmlPipe } from './Pipes/SanitizeHtml.pipe';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, ToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,NgSelectModule
  ], exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FooterComponent,
    NavbarComponent,
    ToolbarComponent,
    NgxDatatableModule,NgSelectModule]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders <any>{
    return {
      ngModule: SharedModule,
      providers: [DatePipe, SanitizeHtmlPipe]
    };
  }

}
