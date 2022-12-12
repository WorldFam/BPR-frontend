import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WebSocketConnectionService } from './websocket-connection.service';

describe('WebsocetConnectionService', () => {
  let service: WebSocketConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WebSocketConnectionService]

    });
    service = TestBed.inject(WebSocketConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
