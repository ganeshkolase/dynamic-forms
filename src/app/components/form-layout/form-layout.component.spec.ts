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
  let wrapperFixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperComponent, FormLayoutComponent]
    }).compileComponents();

    wrapperFixture = TestBed.createComponent(TestWrapperComponent);
    wrapperFixture.detectChanges();
  });

  it('should render projected content inside form layout wrapper', () => {
    const compiled = wrapperFixture.nativeElement;
    const layoutDiv = compiled.querySelector('.dynamic-form-layout');
    const projectedContent = layoutDiv.querySelector('.test-content');

    expect(layoutDiv).toBeTruthy();
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toContain('Test Content');
  });
});
