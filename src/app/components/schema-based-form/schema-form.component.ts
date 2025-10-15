import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/message';
import {FormSchema} from '../../schema/schema';
import {userRegistrationSchema} from '../../schema/form-schems';
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
    ReactiveFormsModule
  ],
  templateUrl: './schema-form.component.html',
  standalone: true,
  styleUrl: './schema-form.component.scss'
})
export class SchemaFormComponent implements OnInit {
  formSchema: FormSchema = userRegistrationSchema as FormSchema;
  dynamicForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm()
  }

  private buildForm() {
    const dynamicFormGroup: { [key: string]: FormControl } = {};

    for (const field of this.formSchema.fields) {
      const validators: ValidatorFn[] = []

      if (field?.required) {
        validators.push(Validators.required)
      }
      if (field?.validation) {
        validators.push(Validators.pattern(field.validation.pattern))
      }
      dynamicFormGroup[field.name] = new FormControl('', validators);
    }
    this.dynamicForm = this.formBuilder.group(dynamicFormGroup);
  }


  onSubmit() {
    this.dynamicForm.markAllAsTouched();
    if (this.dynamicForm.valid) {
      console.log('Form submitted:', this.dynamicForm.value);
    } else {
      console.log('Invalid form')
    }
  }

  getError(fieldName: string): string | null {
    const control = this.dynamicForm.get(fieldName);
    const field = this.formSchema.fields.find(f => f.name === fieldName);
    if (!control || !control.errors || !control.touched) return null;

    if (control.errors['required']) {
      return `Field is required.`;
    }
    if (control.errors['pattern']) {
      return field?.validation?.message || `${field?.label} is invalid.`;
    }

    return null;
  }
}
