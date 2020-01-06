import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorrouteComponent } from './doctorroute.component';

describe('DoctorrouteComponent', () => {
  let component: DoctorrouteComponent;
  let fixture: ComponentFixture<DoctorrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
