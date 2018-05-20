import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Type } from '@angular/compiler/src/core';
import { FormViewFormatterDirective } from './form-view-formatter/form-view-formatter.directive';
import { FormModelNormalizerDirective } from './form-model-normalizer/form-model-normalizer.directive';

const DIRECTIVES: Type[] = [
  FormViewFormatterDirective,
  FormModelNormalizerDirective,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DIRECTIVES,
  ],
  exports: [
    DIRECTIVES,
  ]
})
export class FormUtilsModule { }
