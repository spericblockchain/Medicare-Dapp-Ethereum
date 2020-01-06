import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiiComponent } from './hoii.component';

describe('HoiiComponent', () => {
  let component: HoiiComponent;
  let fixture: ComponentFixture<HoiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
