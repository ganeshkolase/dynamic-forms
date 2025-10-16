import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { Card } from 'primeng/card';
import { Message } from 'primeng/message';
import {Button, ButtonDirective} from 'primeng/button';
import { FormSchema, FormField, FormFieldType } from '../../data/schema';

interface ValidationError {
  path: string;
  message: string;
}

@Component({
  selector: 'app-schema-uploader',
  imports: [CommonModule, FileUpload, Card, Message, Button, ButtonDirective],
  templateUrl: './schema-uploader.component.html',
  styleUrl: './schema-uploader.component.scss',
  standalone: true
})
export class SchemaUploaderComponent {
  @Output() schemaLoaded = new EventEmitter<FormSchema>();

  uploadedSchema: FormSchema | null = null;
  validationErrors: ValidationError[] = [];
  isValid: boolean = false;
  fileName: string = '';

  validFieldTypes: FormFieldType[] = [
    'text', 'date', 'dropdown', 'multiselect',
    'checkbox', 'textarea', 'email', 'radiobutton'
  ];

  onFileSelect(event: any) {
    const file = event.files[0];
    if (!file) return;

    this.fileName = file.name;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        this.validateSchema(jsonContent);

        if (this.isValid) {
          this.uploadedSchema = jsonContent;
          this.schemaLoaded.emit(jsonContent);
        }
      } catch (error) {
        this.validationErrors = [{
          path: 'root',
          message: 'Invalid JSON file. Please upload a valid JSON file.'
        }];
        this.isValid = false;
        this.uploadedSchema = null;
      }
    };

    reader.readAsText(file);
  }

  validateSchema(schema: any): void {
    this.validationErrors = [];
    this.isValid = true;

    if (!schema || typeof schema !== 'object') {
      this.addError('root', 'Schema must be an object');
      return;
    }

    if (!schema.title || typeof schema.title !== 'string') {
      this.addError('title', 'Title is required and must be a string');
    }

    if (!schema.fields || !Array.isArray(schema.fields)) {
      this.addError('fields', 'Fields is required and must be an array');
      return;
    }

    schema.fields.forEach((field: any, index: number) => {
      this.validateField(field, index);
    });
  }

  validateField(field: any, index: number): void {
    const path = `fields[${index}]`;

    if (!field || typeof field !== 'object') {
      this.addError(path, 'Field must be an object');
      return;
    }

    if (!field.label || typeof field.label !== 'string') {
      this.addError(`${path}.label`, 'Label is required and must be a string');
    }

    if (!field.name || typeof field.name !== 'string') {
      this.addError(`${path}.name`, 'Name is required and must be a string');
    }

    if (!field.type || typeof field.type !== 'string') {
      this.addError(`${path}.type`, 'Type is required and must be a string');
    } else if (!this.validFieldTypes.includes(field.type)) {
      this.addError(
        `${path}.type`,
        `Type must be one of: ${this.validFieldTypes.join(', ')}`
      );
    }

    if (field.required !== undefined && typeof field.required !== 'boolean') {
      this.addError(`${path}.required`, 'Required must be a boolean');
    }

    if (field.minLength !== undefined && typeof field.minLength !== 'number') {
      this.addError(`${path}.minLength`, 'MinLength must be a number');
    }

    if (field.maxLength !== undefined && typeof field.maxLength !== 'number') {
      this.addError(`${path}.maxLength`, 'MaxLength must be a number');
    }

    if (field.options !== undefined) {
      if (!Array.isArray(field.options)) {
        this.addError(`${path}.options`, 'Options must be an array');
      } else if (!field.options.every((opt: any) => typeof opt === 'string')) {
        this.addError(`${path}.options`, 'All options must be strings');
      }
    }

    if (field.validation !== undefined) {
      if (typeof field.validation !== 'object') {
        this.addError(`${path}.validation`, 'Validation must be an object');
      } else {
        if (!field.validation.pattern || typeof field.validation.pattern !== 'string') {
          this.addError(`${path}.validation.pattern`, 'Pattern is required and must be a string');
        }
        if (!field.validation.message || typeof field.validation.message !== 'string') {
          this.addError(`${path}.validation.message`, 'Message is required and must be a string');
        }
      }
    }

    if (field.condition !== undefined) {
      if (typeof field.condition !== 'object') {
        this.addError(`${path}.condition`, 'Condition must be an object');
      } else {
        if (!field.condition.fieldName || typeof field.condition.fieldName !== 'string') {
          this.addError(`${path}.condition.fieldName`, 'FieldName is required and must be a string');
        }
        if (field.condition.value === undefined) {
          this.addError(`${path}.condition.value`, 'Value is required');
        }
      }
    }
  }

  addError(path: string, message: string): void {
    this.validationErrors.push({ path, message });
    this.isValid = false;
  }

}
