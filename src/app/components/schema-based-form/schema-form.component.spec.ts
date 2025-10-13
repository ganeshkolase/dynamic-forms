import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaFormComponent } from './schema-form.component';

describe('SchemaBasedFormComponent', () => {
  let component: SchemaFormComponent;
  let fixture: ComponentFixture<SchemaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
