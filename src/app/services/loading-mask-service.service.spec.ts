import { TestBed, inject } from '@angular/core/testing';

import { LoadingMaskServiceService } from './loading-mask-service.service';

describe('LoadingMaskServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingMaskServiceService]
    });
  });

  it('should be created', inject([LoadingMaskServiceService], (service: LoadingMaskServiceService) => {
    expect(service).toBeTruthy();
  }));
});
