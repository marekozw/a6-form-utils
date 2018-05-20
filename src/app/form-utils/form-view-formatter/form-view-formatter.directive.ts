import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormViewTransformations,
  TextTransformation,
  noopTransformation,
} from './../types/types';

const emptyTransformations: FormViewTransformations = {
  onBlur: noopTransformation,
  onFocus: noopTransformation,
};

@Directive({
  selector: '[appFormViewFormatter]'
})
export class FormViewFormatterDirective implements OnInit {
  @Input('appFormViewFormatter')
  public transformations: FormViewTransformations = {};

  private element: HTMLInputElement;

  constructor(
    elementRef: ElementRef
  ) {
    this.element = elementRef.nativeElement;
  }

  // raczej nie chce, powinno byc w FormModelNormalizer
  // nie ma związku z user input
  public ngOnInit(): void {
    // this.onBlur(this.element.value);
  }

  @HostListener('focus', ['$event.target.value'])
  public onFocus(value: string): void {
    const onFocus: TextTransformation = this.getOnFocusTransformation(this.transformations);
    this.setView(onFocus(value));
  }

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value): void {
    const onBlur: TextTransformation = this.getOnBlurTransformation(this.transformations);
    this.setView(onBlur(value));
  }

  private getOnFocusTransformation(transformations: FormViewTransformations = emptyTransformations): TextTransformation {
    const { onFocus = noopTransformation } = transformations;
    return onFocus;
  }

  private getOnBlurTransformation(transformations: FormViewTransformations = emptyTransformations): TextTransformation {
    const { onBlur = noopTransformation } = transformations;
    return onBlur;
  }

  private setView(value: string): void {
    this.element.value = value;
  }
}
