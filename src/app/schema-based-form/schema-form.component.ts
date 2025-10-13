import { Component } from '@angular/core';
import {Message} from 'primeng/message';
import registrationForm from './../schema/sample-schema.json'
import {Schema} from '../schema/schema';

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
