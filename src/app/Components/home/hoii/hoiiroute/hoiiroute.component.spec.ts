import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiirouteComponent } from './hoiiroute.component';

describe('HoiirouteComponent', () => {
  let component: HoiirouteComponent;
  let fixture: ComponentFixture<HoiirouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiirouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiirouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
