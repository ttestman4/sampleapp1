import { TestBed } from '@angular/core/testing';

import { FeatureStoreService } from './feature-store.service';

describe('FeatureStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureStoreService = TestBed.get(FeatureStoreService);
    expect(service).toBeTruthy();
  });
});
