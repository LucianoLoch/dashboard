import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfermarketListComponent } from './transfermarket-list.component';

describe('TransfermarketListComponent', () => {
  let component: TransfermarketListComponent;
  let fixture: ComponentFixture<TransfermarketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfermarketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfermarketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
