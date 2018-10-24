import { TestBed, async, inject } from '@angular/core/testing';

import { SimAuthGuard } from './sim-auth.guard';

describe('SimAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimAuthGuard]
    });
  });

  it('should ...', inject([SimAuthGuard], (guard: SimAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
