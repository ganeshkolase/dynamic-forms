import {Component} from '@angular/core';
import {SchemaFormComponent} from './components/schema-based-form/schema-form.component';
import {FormLayoutComponent} from './components/form-layout/form-layout.component';

@Component({
  selector: 'app-root',
  imports: [SchemaFormComponent, FormLayoutComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-forms';
}
