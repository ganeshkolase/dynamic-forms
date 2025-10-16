import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSchemaFormComponent } from './dynamic-schema-form.component';

describe('SchemaBasedFormComponent', () => {
  let component: DynamicSchemaFormComponent;
  let fixture: ComponentFixture<DynamicSchemaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSchemaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSchemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
