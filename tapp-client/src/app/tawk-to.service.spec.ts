import { TestBed } from '@angular/core/testing';

import { TawkToService } from './tawk-to.service';

describe('TawkToService', () => {
  let service: TawkToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TawkToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
