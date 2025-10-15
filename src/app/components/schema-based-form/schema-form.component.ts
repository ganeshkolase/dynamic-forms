import {Component, Input, OnInit} from '@angular/core';
import {Message} from 'primeng/message';
import {FormSchema} from '../../schema/schema';
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
import {RadioButton} from 'primeng/radiobutton';


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
    RadioButton
  ],
  templateUrl: './schema-form.component.html',
  standalone: true,
  styleUrl: './schema-form.component.scss'
})
export class SchemaFormComponent implements OnInit {
  @Input() formSchema!: FormSchema
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

      if (field?.minLength) {
        validators.push(Validators.minLength(field.minLength))
      }

      if (field?.maxLength) {
        validators.push(Validators.maxLength(field.maxLength))
      }

      dynamicFormGroup[field.name] = new FormControl('', validators);
    }
    this.dynamicForm = this.formBuilder.group(dynamicFormGroup);
  }


  onSubmit() {
    this.dynamicForm.markAllAsTouched();
    if (this.dynamicForm.valid) {
      console.log('formValue', this.dynamicForm.value)
    } else {
      console.error('Invalid form')
    }
  }

  getError(fieldName: string): string | null {
    const control = this.dynamicForm.get(fieldName);
    const field = this.formSchema.fields.find(f => f.name === fieldName);
    if (field) {
      if (!control || !control.errors || !control.touched) return null;

      console.log('errors', control.errors)

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
}
