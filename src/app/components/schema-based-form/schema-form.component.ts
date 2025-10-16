import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/message';
import {FormField, FormSchema} from '../../schema/schema';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {MultiSelect} from 'primeng/multiselect';
import {Checkbox} from 'primeng/checkbox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {Button} from 'primeng/button';


@Component({
  selector: 'app-schema-based-form',
  imports: [
    Message,
    InputText,
    DatePicker,
    Select,
    MultiSelect,
    Checkbox,
    FormsModule,
    Textarea,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './schema-form.component.html',
  standalone: true,
  styleUrl: './schema-form.component.scss'
})
export class SchemaFormComponent implements OnInit {
  @Input() formSchema!: FormSchema
  @Output() onFormSubmit = new EventEmitter<Record<string, any>>();
  dynamicForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm()

    this.formSchema.fields.forEach(field => {
      if (field.condition) {
        const parentControl = this.dynamicForm.get(field.condition.fieldName);
        if (parentControl) {
          parentControl.valueChanges.subscribe(value => {
            const visible = value === field.condition!.value;
            this.toggleFieldVisibility(field, visible);
          });
        }
      }
    });
  }

  toggleFieldVisibility(field: FormField, visible: boolean) {
    const controlExists = this.dynamicForm.contains(field.name);

    if (visible && !controlExists) {
      this.dynamicForm.addControl(field.name, new FormControl('', this.getValidators(field)));
    }
    else if (!visible && controlExists) {
      this.dynamicForm.removeControl(field.name);
    }
  }

  private buildForm() {
    const dynamicFormGroup: { [key: string]: FormControl } = {};

    for (const field of this.formSchema.fields) {

      let fieldValidators = this.getValidators(field);
      dynamicFormGroup[field.name] = new FormControl('', fieldValidators);
    }

    this.dynamicForm = this.formBuilder.group(dynamicFormGroup);
  }

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


  onSubmit() {
    this.dynamicForm.markAllAsTouched();
    if (this.dynamicForm.valid) {
      this.onFormSubmit.emit(this.dynamicForm.value);
    } else {
      console.error('Invalid form')
    }
  }

  getError(fieldName: string): string | null {
    const control = this.dynamicForm.get(fieldName);
    const field = this.formSchema.fields.find(f => f.name === fieldName);
    if (field) {
      if (!control || !control.errors || !control.touched) return null;

      if (control.errors['required']) {
        return `Field is required.`;
      }

      if (control.errors['pattern']) {
        return field?.validation?.message || `${field?.label} is invalid.`;
      }

      if (control.errors['minlength']) {
        return `${field.label} name must be at least ${field.minLength} characters long`;
      }

      if (control.errors['maxlength']) {
        return `${field.label} cannot exceed ${field.minLength} characters`;
      }
    }

    return null;
  }

  isFieldVisible(conditionalField: FormField): boolean {
    if (!conditionalField?.condition) return true;
    if (!this.formSchema || !this.dynamicForm) return true;

    let conditionalFieldName = conditionalField.name;
    const field = this.formSchema.fields.find(f => f.name === conditionalFieldName);
    if (!field?.condition) return true;
    const parentControl = this.dynamicForm.get(field.condition.fieldName);
    if (!parentControl) return false;

    const dependentValue = parentControl.value;
    const expectedValue = field.condition.value;
    return dependentValue === expectedValue;
  }
}
