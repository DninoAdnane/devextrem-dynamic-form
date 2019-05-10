import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDynamicFormComponent } from './libform.component';
import { DxCheckBoxModule, DxSelectBoxModule, DxFormModule, DxTextAreaModule, DxRadioGroupModule, DxTextBoxModule, DxDateBoxModule, DxTagBoxModule, DxValidatorModule, DxValidationGroupModule, DxNumberBoxModule } from 'devextreme-angular';
import { DxDynamicFormService } from './libform.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DxDynamicFormComponent],
  imports: [
    CommonModule, HttpClientModule,DxCheckBoxModule,DxFormModule,DxSelectBoxModule,
      DxTextAreaModule,DxRadioGroupModule,DxTextBoxModule,DxDateBoxModule,DxTagBoxModule,DxValidatorModule,DxValidationGroupModule,
      DxNumberBoxModule
  ],
  providers : [DxDynamicFormService],
  exports: [DxDynamicFormComponent]
})
export class DxDynamicFormrmModule { }
