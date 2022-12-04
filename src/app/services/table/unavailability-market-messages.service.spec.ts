import { TestBed } from '@angular/core/testing';

import { UnavailabilityMarketMessagesService } from './unavailability-market-messages.service';

describe('UrgentMarketMessagesService', () => {
  let service: UnavailabilityMarketMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnavailabilityMarketMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
