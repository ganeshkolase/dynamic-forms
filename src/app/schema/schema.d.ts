export type FormSchema = {
  title: string;
  fields: FormField[];
}

export type FormFieldType =
 'text' |
 'date' |
 'dropdown'|
 'multiselect'|
 'checkbox' |
 'textarea' | 'email' | 'radiobutton'

export type FormValidation = {
  pattern: string;
  message: string;
};

type FormField = {
  label: string;
  name: string;
  type: FormFieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: string[];
  validation?: FormValidation;
}
