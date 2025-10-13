import { Component } from '@angular/core';
import {Message} from 'primeng/message';
import {Schema} from '../../schema/schema';
import registrationForm from '../../schema/sample-schema.json'


@Component({
  selector: 'app-schema-based-form',
  imports: [
    Message
  ],
  templateUrl: './schema-form.component.html',
  standalone: true,
  styleUrl: './schema-form.component.scss'
})
export class SchemaFormComponent {
  schemaForm: Schema = registrationForm
}
