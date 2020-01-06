import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientrouteComponent } from './patientroute.component';

describe('PatientrouteComponent', () => {
  let component: PatientrouteComponent;
  let fixture: ComponentFixture<PatientrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
