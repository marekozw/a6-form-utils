import { Directive, forwardRef, HostListener, ElementRef, Input, OnInit, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, NgControl, FormControl, FormControlName } from '@angular/forms';
import {
  TextTransformation,
  FormModelTransformations,
  noopTransformation,
} from './../types/types';

const emptyTransformations: FormModelTransformations = {
  modelToView: noopTransformation,
  viewToModel: noopTransformation,
};

export const FORM_UTILS_TEXT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormModelNormalizerDirective),
  multi: true
};

@Directive({
  selector: '[formControlName][appFormModelNormalizer]',
  providers: [ FORM_UTILS_TEXT_VALUE_ACCESSOR ]
})
export class FormModelNormalizerDirective implements OnInit, ControlValueAccessor {
  @Input('appFormModelNormalizer')
  public transformations: FormModelTransformations = {};

  private isInitialized: boolean = false;
  private afterFirstValue: boolean = false;
  private updateModel: TextTransformation;
  private element: HTMLInputElement;

  constructor(
    elementRef: ElementRef,
  ) {
    this.element = elementRef.nativeElement;
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.isInitialized = true;
    });

  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string): void {
    const viewToModel: TextTransformation = this.getViewToModelTransformation(this.transformations);
    this.updateModel(viewToModel(value));
  }

  public writeValue(value: string): void {
    console.log('writeValue:', value);
    const modelToView: TextTransformation = this.getModelToViewTransformation(this.transformations);
    this.updateView(modelToView(value));

    if (this.afterFirstValue) {
      setTimeout(() => {
        this.onInput(value);
      });
    }

    this.afterFirstValue = true;
  }

  public registerOnChange(fn: any): void {
    this.updateModel = fn;
  }

  public registerOnTouched(fn: any): void {

  }

  public setDisabledState?(isDisabled: boolean): void {
  }

  private getModelToViewTransformation(transformations: FormModelTransformations = emptyTransformations): TextTransformation {
    const { modelToView = noopTransformation } = transformations;
    return modelToView;
  }

  private getViewToModelTransformation(transformations: FormModelTransformations = emptyTransformations): TextTransformation {
    const { viewToModel = noopTransformation } = transformations;
    return viewToModel;
  }

  private updateView(value: string): void {
    this.element.value = value;
  }
}
