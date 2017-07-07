import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfermarketFilterComponent } from './transfermarket-filter.component';

describe('TransfermarketFilterComponent', () => {
  let component: TransfermarketFilterComponent;
  let fixture: ComponentFixture<TransfermarketFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfermarketFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfermarketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
