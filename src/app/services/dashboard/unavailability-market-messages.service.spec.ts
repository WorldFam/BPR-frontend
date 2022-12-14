import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UnavailabilityMarketMessagesService } from './unavailability-market-messages.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import UMM from 'src/app/UMM.json';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';

describe('UnavailabilityMarketMessagesService', () => {
  let service: UnavailabilityMarketMessagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UnavailabilityMarketMessagesService],
    });
    service = TestBed.inject(UnavailabilityMarketMessagesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return messages as an Observable', () => {
    service.getUrgentMarketMessages().subscribe((messages) => {
      expect(messages.length).toBe(UMM.length);
      expect(messages).toEqual(UMM);
    });

    const req = httpMock.expectOne(`http://localhost:7071/api/messages`);
    expect(req.request.method).toBe('GET');
    req.flush(UMM);
  });

  it('should return an array of messages', () => {
    const queryParams = {
      sources: ['SO1', 'SO2'],
    };

    service
      .getUrgentMarketMessages(queryParams)
      .subscribe((messages: IUnavailabilityMarketMessage[]) => {
        expect(messages.length).toBe(UMM.length);
        expect(messages[0].source).toBe('ENTSOE');
        expect(messages[1].mRID).toBe('6o1QsSewccHrJpmnPrafyg');
      });

    const req = httpMock.expectOne(
      `http://localhost:7071/api/messages?sources=SO1&sources=SO2`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.getAll('sources')).toEqual(['SO1', 'SO2']);
    req.flush(UMM);
  });

  it('should return the correct data', () => {
    const messagemRID = '4gpkzNG1p4qUr3fVJdyUjQ';

    const excpedtedMessage = [
      {
        mRID: '4gpkzNG1p4qUr3fVJdyUjQ',
        source: 'ENTSOE',
        revisionNumber: 2,
        country: 'Serbia',
        biddingZone: '10YCS-SERBIATSOV',
        eventStatus: 'ACTIVE',
        typeOfEvent: 'A77',
        typeOfUnavailability: 'A54',
        affectedAssetOrUnit: 'TE KOLUBARA',
        published: '2022-12-07T13:41:48',
        eventStart: '2022-11-30T22:33:00',
        eventEnd: '2022-12-01T04:36:00',
        availableCapacity: 0,
        installedCapacity: 175,
        unavailableCapacity: -470,
        unitOfMeasure: 'MAW',
      },
    ];

    service.getUrgentMarketMessageHistoricData(messagemRID).subscribe((data) => {
      expect(data).toEqual(excpedtedMessage);
    });

    const req = httpMock.expectOne(
      `http://localhost:7071/api/message/${messagemRID}`
    );
    req.flush(excpedtedMessage);
  });
});
