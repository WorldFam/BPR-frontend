import { TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';
import { UnavailabilityMarketMessagesService } from './unavailability-market-messages.service';

describe('UrgentMarketMessagesService', () => {
  let service: UnavailabilityMarketMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule ], 
      providers: [UnavailabilityMarketMessagesService]
    });
    service = TestBed.inject(UnavailabilityMarketMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
