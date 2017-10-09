import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesItemComponent } from './attributes-item.component';

describe('AttributesItemComponent', () => {
  let component: AttributesItemComponent;
  let fixture: ComponentFixture<AttributesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
