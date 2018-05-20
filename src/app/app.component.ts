import { FormModelTransformations } from './form-utils/types/types';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { TextTransformation, FormViewTransformations } from 'src/app/form-utils/types/types';

const trim: TextTransformation =
  (value) => value.replace(/\s/g, '');

const phoneValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl) => {
  const PHONE_REGEXP = /^\s*\+\s*(\d\s*){11}\s*$/g;

  return PHONE_REGEXP.test(control.value) ? null : {
    phone: 'Numer telefonu jest niepoprawny'
  };
};

const groupPhoneNumer: TextTransformation = (phone: string) => {
  // We can import phone validator, import regexp only or ignore it.
  if (!/^\s*\+\s*(\d\s*){11}\s*$/g.test(phone)) {
    return phone;
  }
  const trimmedPhone: string = phone.replace(/\s/g, '');
  const GROUP_PHONE = /(\+\d{2})(\d{3})(\d{3})(\d{3})/;
  const [ , countryCode, group1, group2, group3 ] = GROUP_PHONE.exec(trimmedPhone);

  return `${countryCode} ${group1} ${group2} ${group3}`;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public personalDataForm: FormGroup;
  public optionsForm: FormGroup;
  public phoneFormatter: FormViewTransformations;
  public phoneNormalizer: FormModelTransformations;
  public asyncPhone: string;

  constructor(
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.optionsForm = this.fb.group({
      asyncPhone: ['+48 0 0 0 0 0 0 0 0 0']
    });

    this.createPhoneTransformations();
    this.createPersonalDataForm();
  }

  public registerUser(event: Event): void {
    console.log(this.personalDataForm.value);
  }

  private createPersonalDataForm(): void {
    this.personalDataForm = this.fb.group({
      phone: [
        // I tak walidacja jest tu pominieta. Nic dziwnego, ze normalizacja tez
        // this.phoneNormalizer.viewToModel('+48 1 2 3 4 5 6 7 8 9 '),
        '',
        Validators.compose([Validators.required, phoneValidator])]
    });

    // setTimeout(() => {
      // this.personalDataForm.get('phone').setValue('invalid1 + 48');
      // this.personalDataForm.get('phone').setValue('invalid2 + 48');
      // this.personalDataForm.get('phone').setValue('invalid3 + 48');
    // });
  }

  private setValue(): void {
    const phone = this.optionsForm.get('asyncPhone').value;
    this.personalDataForm.get('phone').setValue(phone);
  }

  private createPhoneTransformations(): void {
    // User input only. Does not react on value changed programatically (setValue, patchValue).
    this.phoneFormatter = {
      onFocus: (value) => value, // do nothing, can be skipped
      onBlur: groupPhoneNumer, // a pure function.
    };

    this.phoneNormalizer = {
      viewToModel: trim,
      modelToView: groupPhoneNumer, // value updated programatically
    };
  }

}

/*
1. Formatting default value (if valid) (DONE)
2. Normalizing default value - not possible
3. Normalizing value set asynchronously (DONE)
4. Validation of value set asynchronously (DONE)
 */
