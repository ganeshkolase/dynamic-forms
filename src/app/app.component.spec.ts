import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'dynamic-forms' title`, () => {
    expect(component.title).toEqual('dynamic-forms');
  });


  describe('Modal State', () => {
    it('should initialize with modal hidden', () => {
      expect(component.visible).toBe(false);
      expect(component.modalFormData).toBeNull();
    });

    it('should show modal when setModalData is called', () => {
      const testData = { test: 'data' };
      component['setModalData'](testData);

      expect(component.visible).toBe(true);
      expect(component.modalFormData).toEqual(testData);
    });

    it('should clear modal data on close', () => {
      component.modalFormData = { test: 'data' };
      component.visible = true;

      component.onClose();

      expect(component.modalFormData).toBeUndefined();
    });
  });

  describe('onFormSubmit', () => {
    it('should handle form submission', () => {
      spyOn(console, 'log');
      const formData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      component.onFormSubmit(formData);

      expect(console.log).toHaveBeenCalledWith('onFormSubmit', formData);
      expect(component.visible).toBe(true);
      expect(component.modalFormData).toEqual(formData);
    });

    it('should update modal visibility on form submit', () => {
      expect(component.visible).toBe(false);

      component.onFormSubmit({ test: 'data' });

      expect(component.visible).toBe(true);
    });

    it('should store form data in modalFormData', () => {
      const testData = { field1: 'value1', field2: 'value2' };

      component.onFormSubmit(testData);

      expect(component.modalFormData).toEqual(testData);
    });
  });

  describe('Component Integration', () => {
    it('should have form schemas available for child components', () => {
      expect(component.userRegistrationSchema).toBeTruthy();
      expect(component.productRegistrationSchema).toBeTruthy();
    });

    it('should handle multiple form submissions', () => {
      const firstSubmission = { name: 'John' };
      const secondSubmission = { name: 'Jane' };

      component.onFormSubmit(firstSubmission);
      expect(component.modalFormData).toEqual(firstSubmission);

      component.onClose();
      expect(component.modalFormData).toBeUndefined();

      component.onFormSubmit(secondSubmission);
      expect(component.modalFormData).toEqual(secondSubmission);
    });
  });
});
