import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule,BsDropdownConfig} from 'ngx-bootstrap/dropdown';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { ReplaceAttributePipe } from 'src/app/core/pipes';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { UserComponent } from './user/user.component';
import { CampusComponent } from './campus/campus.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ExportAsModule } from 'ngx-export-as';
import { DataTablesModule} from 'angular-datatables';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CoordinationComponent } from './coordination/coordination.component';

@NgModule({
  declarations: [
    UserComponent,
    CampusComponent,
    CoordinationComponent,
  ],
  imports: [
    CommonModule,
    WidgetModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    // ComponentsModule,
    TranslateModule,
    CKEditorModule,
    NgStepperModule,
    CdkStepperModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgSelectModule,
    NgxPaginationModule,
    NgxDatatableModule,
    MaintenanceRoutingModule,
    ExportAsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CoreModule,
    DataTablesModule,
    UiSwitchModule,
    // Acordeón
    
  ],
  providers: [BsDropdownConfig, provideNgxMask()]
})
export class MaintenanceModule { }
