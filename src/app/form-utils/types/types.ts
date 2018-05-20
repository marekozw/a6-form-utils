export type TextTransformation = (value: string) => string;

export interface FormViewTransformations {
  onBlur?: TextTransformation;
  onFocus?: TextTransformation;
}

export interface FormModelTransformations {
  modelToView?: TextTransformation;
  viewToModel?: TextTransformation;
}

export const noopTransformation: TextTransformation = (value) => value;

export const emptyViewTransformations: FormViewTransformations = {
  onBlur: noopTransformation,
  onFocus: noopTransformation,
};

