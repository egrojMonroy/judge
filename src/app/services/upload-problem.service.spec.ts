import { TestBed, inject } from '@angular/core/testing';

import { UploadProblemService } from './upload-problem.service';

describe('UploadProblemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadProblemService]
    });
  });

  it('should be created', inject([UploadProblemService], (service: UploadProblemService) => {
    expect(service).toBeTruthy();
  }));
});
