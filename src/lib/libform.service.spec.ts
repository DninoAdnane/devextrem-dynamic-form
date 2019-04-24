import { TestBed } from '@angular/core/testing';

import { DxDynamicFormService } from './libform.service';

describe('DxDynamicFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DxDynamicFormService = TestBed.get(DxDynamicFormService);
    expect(service).toBeTruthy();
  });
});
