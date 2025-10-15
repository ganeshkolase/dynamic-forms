import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/message';
import {FormSchema} from '../../schema/schema';
import {userRegistrationSchema} from '../../schema/form-schems';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {MultiSelect} from 'primeng/multiselect';
import {Checkbox} from 'primeng/checkbox';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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

  isChecked: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm()
  }

  private buildForm() {
    const dynamicFormGroup: { [key: string]: FormControl } = {};

    for (const field of this.formSchema.fields) {
      dynamicFormGroup[field.name] = new FormControl('');
    }
    this.dynamicForm = this.formBuilder.group(dynamicFormGroup);
  }

  onSubmit() {
    console.log('formValue', this.dynamicForm.value)
  }

}
