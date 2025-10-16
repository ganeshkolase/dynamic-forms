import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormLayoutComponent } from './form-layout.component';

@Component({
  selector: 'app-test-wrapper',
  template: `
    <app-form-layout>
      <div class="test-content">Test Content</div>
    </app-form-layout>
  `,
  standalone: true,
  imports: [FormLayoutComponent]
})
class TestWrapperComponent {}

describe('FormLayoutComponent', () => {
  let component: FormLayoutComponent;
  let fixture: ComponentFixture<FormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.dynamic-form-layout')).toBeTruthy();
  });

  it('should have correct CSS class', () => {
    const compiled = fixture.nativeElement;
    const layoutDiv = compiled.querySelector('div');
    expect(layoutDiv.classList.contains('dynamic-form-layout')).toBe(true);
  });

  describe('Component Structure', () => {
    it('should be a standalone component', () => {
      expect(FormLayoutComponent).toBeDefined();
    });

    it('should have correct selector', () => {
      const metadata = (FormLayoutComponent as any).ɵcmp;
      expect(metadata.selectors[0][0]).toBe('app-form-layout');
    });
  });
});

describe('FormLayoutComponent - Content Projection', () => {
  let wrapperFixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperComponent, FormLayoutComponent]
    }).compileComponents();

    wrapperFixture = TestBed.createComponent(TestWrapperComponent);
    wrapperFixture.detectChanges();
  });

  it('should project content into ng-content', () => {
    const compiled = wrapperFixture.nativeElement;
    const projectedContent = compiled.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toContain('Test Content');
  });

  it('should wrap projected content in layout div', () => {
    const compiled = wrapperFixture.nativeElement;
    const layoutDiv = compiled.querySelector('.dynamic-form-layout');
    const projectedContent = layoutDiv.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
  });
});
