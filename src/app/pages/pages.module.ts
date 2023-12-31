import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from '../core/core.module';
import { CallComponent } from './call/call.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SettingsModule } from './settings/settings.module';
import { AllowedIpComponent } from './allowed-ip/allowed-ip.component';


// SMART WIZARD
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';

// dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import {ScrollingModule} from '@angular/cdk/scrolling';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    CallComponent,
    AllowedIpComponent,
    ChatComponent,
    ProfileComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    MaintenanceModule,
    TranslateModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule, // CALENDAR
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    NgxPaginationModule,
    SettingsModule,

    // SMART WIZARD
    CKEditorModule,
    NgStepperModule,
    CdkStepperModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,

    // dropzone
    NgxDropzoneModule,
    BsDatepickerModule,

    // Flakpicjer
    FlatpickrModule,
    // NgxDatatableModule,
    // ExportAsModule,
    // DataTablesModule
    AccordionModule,
  ],
  providers: [BsDropdownConfig, provideNgxMask()]
})
export class PagesModule { }
