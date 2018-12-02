import { TestBed } from '@angular/core/testing';

import { NonFunctionalService } from './non-functional.service';

describe('NonFunctionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonFunctionalService = TestBed.get(NonFunctionalService);
    expect(service).toBeTruthy();
  });
});
