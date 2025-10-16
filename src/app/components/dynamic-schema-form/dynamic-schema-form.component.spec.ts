import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DynamicSchemaFormComponent } from './dynamic-schema-form.component';
import { DynamicFormService } from '../../services/dynamic-form.service';
import {
  mockSimpleSchema,
  mockSchemaWithConditionalField,
  mockSchemaWithMultipleFieldTypes,
  mockSchemaWithValidation
} from '../../testing/mock-schemas';
import { FormField } from '../../data/schema';

describe('DynamicSchemaFormComponent', () => {
  let component: DynamicSchemaFormComponent;
  let fixture: ComponentFixture<DynamicSchemaFormComponent>;
  let dynamicFormService: DynamicFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSchemaFormComponent, ReactiveFormsModule],
      providers: [DynamicFormService, provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSchemaFormComponent);
    component = fixture.componentInstance;
    dynamicFormService = TestBed.inject(DynamicFormService);
  });

  it('should create', () => {
    component.formSchema = mockSimpleSchema;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize dynamic form on ngOnInit', () => {
      component.formSchema = mockSimpleSchema;
      component.ngOnInit();

      expect(component.dynamicForm).toBeTruthy();
      expect(component.dynamicForm.get('name')).toBeTruthy();
      expect(component.dynamicForm.get('email')).toBeTruthy();
    });

    it('should set up conditional field listeners on initialization', () => {
      component.formSchema = mockSchemaWithConditionalField;
      component.ngOnInit();

      const employmentStatusControl = component.dynamicForm.get('employmentStatus');
      expect(employmentStatusControl).toBeTruthy();

      expect(component.dynamicForm.get('companyName')).toBeTruthy();
      expect(component.dynamicForm.get('universityName')).toBeTruthy();
    });

    it('should build form with all fields from schema', () => {
      component.formSchema = mockSchemaWithMultipleFieldTypes;
      component.ngOnInit();

      expect(component.dynamicForm.get('fullName')).toBeTruthy();
      expect(component.dynamicForm.get('dob')).toBeTruthy();
      expect(component.dynamicForm.get('gender')).toBeTruthy();
      expect(component.dynamicForm.get('hobbies')).toBeTruthy();
      expect(component.dynamicForm.get('subscribe')).toBeTruthy();
      expect(component.dynamicForm.get('comments')).toBeTruthy();
    });
  });

  describe('Conditional Fields - Use Cases', () => {
    beforeEach(() => {
      component.formSchema = mockSchemaWithConditionalField;
      component.ngOnInit();
    });

    it('should show company name field when user selects Employed status', () => {
      component.dynamicForm.get('employmentStatus')?.setValue('Employed');

      const companyNameField = mockSchemaWithConditionalField.fields.find(f => f.name === 'companyName')!;
      expect(component.isFieldVisible(companyNameField)).toBe(true);
    });

    it('should show university name field when user selects Student status', () => {
      component.dynamicForm.get('employmentStatus')?.setValue('Student');

      const universityNameField = mockSchemaWithConditionalField.fields.find(f => f.name === 'universityName')!;
      expect(component.isFieldVisible(universityNameField)).toBe(true);
    });

    it('should hide conditional fields when their condition is not met', () => {
      component.dynamicForm.get('employmentStatus')?.setValue('Unemployed');

      const companyNameField = mockSchemaWithConditionalField.fields.find(f => f.name === 'companyName')!;
      const universityNameField = mockSchemaWithConditionalField.fields.find(f => f.name === 'universityName')!;

      expect(component.isFieldVisible(companyNameField)).toBe(false);
      expect(component.isFieldVisible(universityNameField)).toBe(false);
    });

    it('should dynamically switch between conditional fields when parent value changes', (done) => {
      const employmentStatusControl = component.dynamicForm.get('employmentStatus');

      employmentStatusControl?.setValue('Employed');

      setTimeout(() => {
        expect(component.dynamicForm.get('companyName')).toBeTruthy();
        expect(component.dynamicForm.get('universityName')).toBeFalsy();

        employmentStatusControl?.setValue('Student');

        setTimeout(() => {
          expect(component.dynamicForm.get('companyName')).toBeFalsy();
          expect(component.dynamicForm.get('universityName')).toBeTruthy();
          done();
        }, 10);
      }, 10);
    });

    it('should always show fields without conditional logic', () => {
      const employmentStatusField = mockSchemaWithConditionalField.fields.find(f => f.name === 'employmentStatus')!;
      expect(component.isFieldVisible(employmentStatusField)).toBe(true);
    });

    it('should handle edge case when form schema is not initialized', () => {
      component.formSchema = null as any;
      const field: FormField = {
        label: 'Test',
        name: 'test',
        type: 'text',
        condition: { fieldName: 'other', value: 'value' }
      };
      expect(component.isFieldVisible(field)).toBe(true);
    });

    it('should handle edge case when field does not exist in schema', () => {
      const field: FormField = {
        label: 'Test',
        name: 'nonExistentField',
        type: 'text',
        condition: { fieldName: 'nonExistent', value: 'value' }
      };
      expect(component.isFieldVisible(field)).toBe(true);
    });

    it('should safely handle adding visibility to non-existent controls', () => {
      const field: FormField = {
        label: 'Test Field',
        name: 'testField',
        type: 'text',
        required: true
      };

      component.dynamicForm.removeControl('testField');
      expect(component.dynamicForm.get('testField')).toBeFalsy();

      component.toggleFieldVisibility(field, true);
      expect(component.dynamicForm.get('testField')).toBeTruthy();
    });

    it('should safely handle removing visibility from non-existent controls', () => {
      const field: FormField = {
        label: 'Non Existent',
        name: 'nonExistent',
        type: 'text'
      };

      expect(() => {
        component.toggleFieldVisibility(field, false);
      }).not.toThrow();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.formSchema = mockSimpleSchema;
      component.ngOnInit();
    });

    it('should emit parsed form data with correct structure when form is valid', () => {
      spyOn(component.onFormSubmit, 'emit');

      component.dynamicForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com'
      });

      component.onSubmit();

      expect(component.onFormSubmit.emit).toHaveBeenCalled();
      const emittedData = (component.onFormSubmit.emit as jasmine.Spy).calls.mostRecent().args[0];
      expect(Array.isArray(emittedData)).toBe(true);
      expect(emittedData[0]).toEqual({
        fieldName: 'name',
        label: 'Name',
        value: 'John Doe'
      });
      expect(emittedData[1]).toEqual({
        fieldName: 'email',
        label: 'Email',
        value: 'john@example.com'
      });
    });

    it('should not emit form data when form is invalid', () => {
      spyOn(component.onFormSubmit, 'emit');
      spyOn(console, 'error');

      component.onSubmit();

      expect(component.onFormSubmit.emit).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Invalid form');
    });

    it('should mark all fields as touched on submit', () => {
      component.onSubmit();

      expect(component.dynamicForm.get('name')?.touched).toBe(true);
      expect(component.dynamicForm.get('email')?.touched).toBe(true);
    });
  });

  describe('getError', () => {
    beforeEach(() => {
      component.formSchema = mockSchemaWithValidation;
      component.ngOnInit();
    });

    it('should return null when control has no errors', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('valid_username');
      control?.markAsTouched();

      const error = component.getError('username');
      expect(error).toBeNull();
    });

    it('should return null when control is not touched', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('');

      const error = component.getError('username');
      expect(error).toBeNull();
    });

    it('should return required error message', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('');
      control?.markAsTouched();

      const error = component.getError('username');
      expect(error).toBe('Field is required.');
    });

    it('should return pattern validation error message', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('invalid username!');
      control?.markAsTouched();

      const error = component.getError('username');
      expect(error).toBe('Username can only contain letters, numbers, and underscores');
    });

    it('should return minlength error message', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('abc');
      control?.markAsTouched();

      const error = component.getError('username');
      expect(error).toContain('must be at least');
      expect(error).toContain('5 characters long');
    });

    it('should return maxlength error message', () => {
      const control = component.dynamicForm.get('username');
      control?.setValue('a'.repeat(25));
      control?.markAsTouched();

      const error = component.getError('username');
      expect(error).toContain('cannot exceed');
      expect(error).toContain('characters');
    });

    it('should return null for non-existent field', () => {
      const error = component.getError('nonExistentField');
      expect(error).toBeNull();
    });

    it('should return custom validation message when available', () => {
      const control = component.dynamicForm.get('phone');
      control?.setValue('123');
      control?.markAsTouched();

      const error = component.getError('phone');
      expect(error).toBe('Phone number must be 10 digits');
    });
  });

  describe('Form Validation Integration', () => {
    beforeEach(() => {
      component.formSchema = mockSchemaWithValidation;
      component.ngOnInit();
    });

    it('should validate form correctly with all valid data', () => {
      component.dynamicForm.patchValue({
        username: 'john_doe',
        phone: '1234567890',
        website: 'https://example.com'
      });

      expect(component.dynamicForm.valid).toBe(true);
    });

    it('should invalidate form with incorrect data', () => {
      component.dynamicForm.patchValue({
        username: 'ab',
        phone: '123',
        website: 'not-a-url'
      });

      expect(component.dynamicForm.valid).toBe(false);
      expect(component.dynamicForm.get('username')?.invalid).toBe(true);
      expect(component.dynamicForm.get('phone')?.invalid).toBe(true);
      expect(component.dynamicForm.get('website')?.invalid).toBe(true);
    });

    it('should allow optional fields to be empty', () => {
      component.dynamicForm.patchValue({
        username: 'john_doe',
        phone: '1234567890',
        website: ''
      });

      expect(component.dynamicForm.valid).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle form with multiple field types correctly', () => {
      component.formSchema = mockSchemaWithMultipleFieldTypes;
      component.ngOnInit();

      component.dynamicForm.patchValue({
        fullName: 'John Doe',
        dob: new Date('1990-01-01'),
        gender: 'Male',
        hobbies: ['Reading', 'Sports'],
        subscribe: true,
        comments: 'Test comment'
      });

      expect(component.dynamicForm.valid).toBe(true);
    });

    it('should handle conditional fields with validation', (done) => {
      component.formSchema = mockSchemaWithConditionalField;
      component.ngOnInit();

      component.dynamicForm.get('employmentStatus')?.setValue('Employed');

      setTimeout(() => {
        const companyNameControl = component.dynamicForm.get('companyName');
        expect(companyNameControl).toBeTruthy();

        expect(component.dynamicForm.valid).toBe(false);

        companyNameControl?.setValue('Tech Corp');
        expect(component.dynamicForm.valid).toBe(true);
        done();
      }, 50);
    });
  });
});
