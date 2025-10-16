import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {FormField, FormSchema} from '../schema/schema';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder) { }

  private getValidators(field: FormField) {
    const validators: ValidatorFn[] = []

    if (field?.required) {
      validators.push(Validators.required)
    }
    if (field?.validation) {
      validators.push(Validators.pattern(field.validation.pattern))
    }

    if (field?.minLength) {
      validators.push(Validators.minLength(field.minLength))
    }

    if (field?.maxLength) {
      validators.push(Validators.maxLength(field.maxLength))
    }

    return validators
  }

  buildForm(formSchema: FormSchema) {
    const dynamicFormGroup: { [key: string]: FormControl } = {};

    for (const field of formSchema.fields) {

      let fieldValidators = this.getValidators(field);
      dynamicFormGroup[field.name] = new FormControl('', fieldValidators);
    }

    return this.formBuilder.group(dynamicFormGroup);
  }
}
