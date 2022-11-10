import { TestBed } from '@angular/core/testing';

import { UrgentMarketMessagesService } from './urgent-market-messages.service';

describe('UrgentMarketMessagesService', () => {
  let service: UrgentMarketMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgentMarketMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
