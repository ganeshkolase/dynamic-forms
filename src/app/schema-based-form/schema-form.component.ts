import { Component } from '@angular/core';
import {Message} from 'primeng/message';

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

}
