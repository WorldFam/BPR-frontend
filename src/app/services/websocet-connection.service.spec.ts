import { TestBed } from '@angular/core/testing';

import { WebsocetConnectionService } from './websocet-connection.service';

describe('WebsocetConnectionService', () => {
  let service: WebsocetConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocetConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
