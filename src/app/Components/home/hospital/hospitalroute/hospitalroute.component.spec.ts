import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalrouteComponent } from './hospitalroute.component';

describe('HospitalrouteComponent', () => {
  let component: HospitalrouteComponent;
  let fixture: ComponentFixture<HospitalrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
