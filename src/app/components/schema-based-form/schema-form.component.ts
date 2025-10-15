import {Component} from '@angular/core';
import {Message} from 'primeng/message';
import {FormSchema} from '../../schema/schema';
import {userRegistrationSchema} from '../../schema/form-schems';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {MultiSelect} from 'primeng/multiselect';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-schema-based-form',
  imports: [
    Message,
    InputText,
    DatePicker,
    Select,
    MultiSelect,
    Checkbox,
    FormsModule
  ],
  templateUrl: './schema-form.component.html',
  standalone: true,
  styleUrl: './schema-form.component.scss'
})
export class SchemaFormComponent {
  schemaForm: FormSchema = userRegistrationSchema as FormSchema;
  isChecked: boolean = true;
}
