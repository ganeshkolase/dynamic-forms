import {Component} from '@angular/core';
import {SchemaFormComponent} from './schema-based-form/schema-form.component';

@Component({
  selector: 'app-root',
  imports: [SchemaFormComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-forms';
}
