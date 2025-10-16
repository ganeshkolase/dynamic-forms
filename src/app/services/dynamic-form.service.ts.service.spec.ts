import {TestBed} from '@angular/core/testing';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicFormService} from './dynamic-form.service';
import {FormField, FormSchema} from '../data/schema';
import {
  mockSchemaWithConditionalField,
  mockSchemaWithMultipleFieldTypes,
  mockSchemaWithValidation,
  mockSimpleSchema
} from '../testing/mock-schemas';

describe('DynamicFormService', () => {
  let service: DynamicFormService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormService, FormBuilder]
    });
    service = TestBed.inject(DynamicFormService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getValidators', () => {
    it('should return empty array when no validators are specified', () => {
      const field: FormField = {
        label: 'Test Field',
        name: 'testField',
        type: 'text'
      };

      const validators = service.getValidators(field);

      expect(validators).toEqual([]);
    });

    it('should return required validator when field is required', () => {
      const field: FormField = {
        label: 'Test Field',
        name: 'testField',
        type: 'text',
        required: true
      };

      const validators = service.getValidators(field);

      expect(validators.length).toBe(1);
      expect(validators[0]).toBe(Validators.required);
    });

    it('should return pattern validator when validation pattern is specified', () => {
      const field: FormField = {
        label: 'Email',
        name: 'email',
        type: 'email',
        validation: {
          pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
          message: 'Invalid email'
        }
      };

      const validators = service.getValidators(field);

      expect(validators.length).toBe(1);

      const control = formBuilder.control('', validators);
      control.setValue('invalid-email');
      expect(control.hasError('pattern')).toBe(true);
      control.setValue('valid@email.com');
      expect(control.hasError('pattern')).toBe(false);
    });

    it('should return minLength validator when minLength is specified', () => {
      const field: FormField = {
        label: 'Username',
        name: 'username',
        type: 'text',
        minLength: 5
      };

      const validators = service.getValidators(field);

      expect(validators.length).toBe(1);
      const control = formBuilder.control('', validators);
      control.setValue('abc');
      expect(control.hasError('minlength')).toBe(true);
      control.setValue('abcdef');
      expect(control.hasError('minlength')).toBe(false);
    });

    it('should return maxLength validator when maxLength is specified', () => {
      const field: FormField = {
        label: 'Username',
        name: 'username',
        type: 'text',
        maxLength: 10
      };

      const validators = service.getValidators(field);

      expect(validators.length).toBe(1);
      const control = formBuilder.control('', validators);
      control.setValue('12345678901');
      expect(control.hasError('maxlength')).toBe(true);
      control.setValue('12345');
      expect(control.hasError('maxlength')).toBe(false);
    });

    it('should return multiple validators when multiple validations are specified', () => {
      const field: FormField = {
        label: 'Username',
        name: 'username',
        type: 'text',
        required: true,
        minLength: 5,
        maxLength: 20,
        validation: {
          pattern: '^[a-zA-Z0-9_]+$',
          message: 'Invalid username'
        }
      };

      const validators = service.getValidators(field);

      expect(validators.length).toBe(4);
    });
  });

  describe('buildForm', () => {
    it('should build a form group from a simple schema', () => {
      const form = service.buildForm(mockSimpleSchema);

      expect(form).toBeTruthy();
      expect(form.get('name')).toBeTruthy();
      expect(form.get('email')).toBeTruthy();
    });

    it('should create form controls with correct validators', () => {
      const form = service.buildForm(mockSimpleSchema);

      const nameControl = form.get('name');
      const emailControl = form.get('email');


      nameControl?.setValue('');
      expect(nameControl?.hasError('required')).toBe(true);


      nameControl?.setValue('ab');
      expect(nameControl?.hasError('minlength')).toBe(true);


      nameControl?.setValue('a'.repeat(51));
      expect(nameControl?.hasError('maxlength')).toBe(true);

      nameControl?.setValue('John Doe');
      expect(nameControl?.valid).toBe(true);

      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('pattern')).toBe(true);

      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should build form with all field types', () => {
      const form = service.buildForm(mockSchemaWithMultipleFieldTypes);

      expect(form.get('fullName')).toBeTruthy();
      expect(form.get('dob')).toBeTruthy();
      expect(form.get('gender')).toBeTruthy();
      expect(form.get('hobbies')).toBeTruthy();
      expect(form.get('subscribe')).toBeTruthy();
      expect(form.get('comments')).toBeTruthy();
    });

    it('should build form with conditional fields', () => {
      const form = service.buildForm(mockSchemaWithConditionalField);

      expect(form.get('employmentStatus')).toBeTruthy();
      expect(form.get('companyName')).toBeTruthy();
      expect(form.get('universityName')).toBeTruthy();
    });

    it('should initialize form controls with empty values', () => {
      const form = service.buildForm(mockSimpleSchema);

      expect(form.get('name')?.value).toBe('');
      expect(form.get('email')?.value).toBe('');
    });
  });

  describe('parseSubmittedFormData', () => {
    it('should parse form data correctly to emit', () => {
      const form = service.buildForm(mockSimpleSchema);
      form.patchValue({
        name: 'John Doe',
        email: 'john@example.com'
      });

      const parsedData = service.parseSubmittedFormData(form, mockSimpleSchema);

      expect(parsedData.length).toBe(2);
      expect(parsedData[0]).toEqual({
        fieldName: 'name',
        label: 'Name',
        value: 'John Doe'
      });
      expect(parsedData[1]).toEqual({
        fieldName: 'email',
        label: 'Email',
        value: 'john@example.com'
      });
    });

    it('should handle empty form values', () => {
      const form = service.buildForm(mockSimpleSchema);

      const parsedData = service.parseSubmittedFormData(form, mockSimpleSchema);

      expect(parsedData.length).toBe(2);
      expect(parsedData[0].value).toBe('');
      expect(parsedData[1].value).toBe('');
    });

    it('should handle complex form with multiple field types', () => {
      const form = service.buildForm(mockSchemaWithMultipleFieldTypes);
      form.patchValue({
        fullName: 'Bob Smith',
        dob: new Date('1990-01-01'),
        gender: 'Female',
        hobbies: ['Reading', 'Music'],
        subscribe: true,
        comments: 'Test comment'
      });

      const parsedData = service.parseSubmittedFormData(form, mockSchemaWithMultipleFieldTypes);

      expect(parsedData.length).toBe(6);
      expect(parsedData.find(d => d.fieldName === 'fullName')?.value).toBe('Bob Smith');
      expect(parsedData.find(d => d.fieldName === 'gender')?.value).toBe('Female');
      expect(parsedData.find(d => d.fieldName === 'hobbies')?.value).toEqual(['Reading', 'Music']);
      expect(parsedData.find(d => d.fieldName === 'subscribe')?.value).toBe(true);
    });

    it('should return empty object for fields having empty values', () => {
      const schema: FormSchema = {
        title: 'Test',
        fields: []
      };
      const form = formBuilder.group({
        unknownField: ['test']
      });

      const parsedData = service.parseSubmittedFormData(form, schema);

      expect(parsedData[0]).toEqual({
        fieldName: '',
        label: '',
        value: ''
      });
    });

    it('should handle partial form data', () => {
      const form = service.buildForm(mockSchemaWithMultipleFieldTypes);
      form.patchValue({
        fullName: 'John Doe',
        gender: 'Male'
      });

      const parsedData = service.parseSubmittedFormData(form, mockSchemaWithMultipleFieldTypes);

      expect(parsedData.length).toBe(6);
      expect(parsedData.find(d => d.fieldName === 'fullName')?.value).toBe('John Doe');
      expect(parsedData.find(d => d.fieldName === 'gender')?.value).toBe('Male');
      expect(parsedData.find(d => d.fieldName === 'dob')?.value).toBe('');
    });
  });

  it('should build and validate a complete form workflow', () => {
    const form = service.buildForm(mockSchemaWithValidation);

    expect(form.valid).toBe(false);

    form.patchValue({
      username: 'ab',
      phone: '123',
      website: 'not-a-url'
    });
    expect(form.valid).toBe(false);

    form.patchValue({
      username: 'john_doe',
      phone: '1234567890',
      website: 'https://example.com'
    });
    expect(form.valid).toBe(true);

    const parsedData = service.parseSubmittedFormData(form, mockSchemaWithValidation);
    expect(parsedData.length).toBe(3);
    expect(parsedData.every(d => d.value !== '')).toBe(true);
  });
});
