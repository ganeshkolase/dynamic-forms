import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaUploaderComponent } from './schema-uploader.component';

describe('SchemaUploaderComponent', () => {
  let component: SchemaUploaderComponent;
  let fixture: ComponentFixture<SchemaUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
