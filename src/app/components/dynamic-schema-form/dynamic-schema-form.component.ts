import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/message';
import {FormField, FormSchema} from '../../data/schema';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {MultiSelect} from 'primeng/multiselect';
import {Checkbox} from 'primeng/checkbox';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {Button} from 'primeng/button';
import {DynamicFormService} from '../../services/dynamic-form.service';


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
  templateUrl: './dynamic-schema-form.component.html',
  standalone: true,
  styleUrl: './dynamic-schema-form.component.scss'
})
export class DynamicSchemaFormComponent implements OnInit {
  @Input() formSchema!: FormSchema
  @Output() onFormSubmit = new EventEmitter<Record<string, any>>();
  dynamicForm!: FormGroup;

  constructor(private dynamicFormService: DynamicFormService) {
  }

  ngOnInit() {
    this.dynamicForm = this.dynamicFormService.buildForm(this.formSchema);

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
      this.dynamicForm.addControl(field.name, new FormControl('', this.dynamicFormService.getValidators(field)));
    }
    else if (!visible && controlExists) {
      this.dynamicForm.removeControl(field.name);
    }
  }


  onSubmit() {
    this.dynamicForm.markAllAsTouched();
    if (this.dynamicForm.valid) {
      let formData = this.dynamicFormService.parseSubmittedFormData(this.dynamicForm, this.formSchema);
      this.onFormSubmit.emit(formData);
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
