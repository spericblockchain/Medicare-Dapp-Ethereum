import { TestBed, async, inject } from '@angular/core/testing';

import { HoiiGuard } from './hoii.guard';

describe('HoiiGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoiiGuard]
    });
  });

  it('should ...', inject([HoiiGuard], (guard: HoiiGuard) => {
    expect(guard).toBeTruthy();
  }));
});
