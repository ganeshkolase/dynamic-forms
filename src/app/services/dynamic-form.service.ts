import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormField, FormSchema} from '../data/schema';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder) { }

  getValidators(field: FormField) {
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

  public parseSubmittedFormData(dynamicForm:  FormGroup<any>, formSchema: FormSchema ) {
    return Object.keys(dynamicForm.value).map((fieldName) => {
      let field = formSchema.fields.find(field => field.name === fieldName);
      if (field) {
        return {
          fieldName: fieldName,
          label: field.label,
          value: dynamicForm.value[fieldName],
        }
      }
      return {
        fieldName: "",
        label: "",
        value: "",
      }
    });
  }
}
