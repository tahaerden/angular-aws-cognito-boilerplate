import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormErrorPipe } from './custom-form-error.pipe';

@NgModule({
  declarations: [CustomFormErrorPipe],
  imports: [FormsModule, ReactiveFormsModule],
  exports: [FormsModule, ReactiveFormsModule, CustomFormErrorPipe]
})
export class FormModule {}
