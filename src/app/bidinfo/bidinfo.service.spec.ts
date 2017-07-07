import { TestBed, inject } from '@angular/core/testing';

import { BidinfoService } from './bidinfo.service';

describe('BidinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidinfoService]
    });
  });

  it('should ...', inject([BidinfoService], (service: BidinfoService) => {
    expect(service).toBeTruthy();
  }));
});
