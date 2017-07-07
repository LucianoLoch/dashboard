import { TestBed, inject } from '@angular/core/testing';

import { TransfermarketService } from './transfermarket.service';

describe('TransfermarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransfermarketService]
    });
  });

  it('should ...', inject([TransfermarketService], (service: TransfermarketService) => {
    expect(service).toBeTruthy();
  }));
});
