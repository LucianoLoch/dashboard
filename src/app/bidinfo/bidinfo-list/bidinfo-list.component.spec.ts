import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidinfoListComponent } from './bidinfo-list.component';

describe('BidinfoListComponent', () => {
  let component: BidinfoListComponent;
  let fixture: ComponentFixture<BidinfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidinfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidinfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
