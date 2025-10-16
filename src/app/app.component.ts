import {Component} from '@angular/core';
import {DynamicSchemaFormComponent} from './components/dynamic-schema-form/dynamic-schema-form.component';
import {FormLayoutComponent} from './components/form-layout/form-layout.component';
import {SchemaUploaderComponent} from './components/schema-uploader/schema-uploader.component';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {jobApplicationSchema, userRegistrationSchema} from './data'
import {FormSchema} from './data/schema';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-root',
  imports: [DynamicSchemaFormComponent, FormLayoutComponent, SchemaUploaderComponent, Tabs, TabList, Tab, TabPanels, TabPanel, Dialog],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-forms';
  userRegistrationSchema = userRegistrationSchema as FormSchema;
  productRegistrationSchema = jobApplicationSchema as FormSchema;
  uploadedSchema: FormSchema | null = null;
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

  onSchemaLoaded(schema: FormSchema) {
    this.uploadedSchema = schema;
  }
}
