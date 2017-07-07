import { TestBed, inject } from '@angular/core/testing';

import { HttpUtilService } from './http-util.service';

describe('HttpUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpUtilService]
    });
  });

  it('should ...', inject([HttpUtilService], (service: HttpUtilService) => {
    expect(service).toBeTruthy();
  }));
});
