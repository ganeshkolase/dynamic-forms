import {Component} from '@angular/core';
import {DynamicSchemaFormComponent} from './components/dynamic-schema-form/dynamic-schema-form.component';
import {FormLayoutComponent} from './components/form-layout/form-layout.component';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {productFeedbackSchema, userRegistrationSchema} from './schema'
import {FormSchema} from './schema/schema';
import {Dialog} from 'primeng/dialog';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DynamicSchemaFormComponent, FormLayoutComponent, Tabs, TabList, Tab, TabPanels, TabPanel, Dialog, KeyValuePipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-forms';
  userRegistrationSchema = userRegistrationSchema as FormSchema;
  productRegistrationSchema = productFeedbackSchema as FormSchema;
  modalFormData: any = null
  visible: boolean = false;

  onFormSubmit(data: Record<string, any>) {
    this.setModalData(data)
    console.log('onFormSubmit', data);
  }

  private setModalData(data: Record<string, any>) {
    console.log('data',data)
    this.modalFormData = data;
    this.visible = true;
  }

  onClose() {
    this.modalFormData = undefined;
  }
}
