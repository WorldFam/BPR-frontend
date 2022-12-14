import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WebSocketConnectionService } from './websocket-connection.service';

describe('WebSocketConnectionService', () => {
  let service: WebSocketConnectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [WebSocketConnectionService],
    });
    service = TestBed.inject(WebSocketConnectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUriAndConnectToPubSub', () => {
    spyOn(service, 'getUriAndConnectToPubSub').and.callThrough();

    service.subscribeToWebSocket();

    expect(service.getUriAndConnectToPubSub).toHaveBeenCalled();
  });

  it('should return the correct data', () => {
    const expectedData = 'wss://umm/api/generate-uri';

    service.subscribeToWebSocket().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne('http://localhost:7071/api/generate-uri');
    req.flush({ uri: expectedData });
    httpMock.verify();
  });
});
