import {Component} from '@angular/core';
import {SchemaFormComponent} from './components/schema-based-form/schema-form.component';
import {FormLayoutComponent} from './components/form-layout/form-layout.component';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {userRegistrationSchema} from  './schema'
import {productFeedbackSchema} from './schema'
import {FormSchema} from './schema/schema';

@Component({
  selector: 'app-root',
  imports: [SchemaFormComponent, FormLayoutComponent, Tabs, TabList, Tab, TabPanels, TabPanel],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-forms';
  userRegistrationSchema = userRegistrationSchema as FormSchema;
  productRegistrationSchema = productFeedbackSchema as FormSchema;

  onFormSubmit(data: Record<string, any>) {
    console.log('onFormSubmit', data);
  }
}
