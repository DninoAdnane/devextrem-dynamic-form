import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDynamicFormComponent } from './libform.component';

describe('DxDynamicFormComponent', () => {
  let component: DxDynamicFormComponent;
  let fixture: ComponentFixture<DxDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
