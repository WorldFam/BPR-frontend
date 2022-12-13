import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UnavailabilityMarketMessageTableColumns } from 'src/app/data/table.data';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import UMM from 'src/app/UMM.json';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
      ],
      declarations: [DashboardComponent],
      providers: [UnavailabilityMarketMessagesService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.dataSource.data = UMM;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate the correct columns', () => {
    const columns = component.generateColumns();
    const columnLibrary = UnavailabilityMarketMessageTableColumns;
    expect(columns).toBeDefined();
    expect(columnLibrary).toBeDefined();

    const columnsSizeWithoutParent =
      columnLibrary.length -
      columnLibrary.filter((column) => column.hasOwnProperty('subcolumns'))
        .length;
    const columnsSizeWithChildren = columnLibrary
      .filter((parent) => parent.hasOwnProperty('subcolumns'))
      .map((child) => child.subcolumns)
      .flat();
    const totalColumnSize =
      columnsSizeWithoutParent + columnsSizeWithChildren.length;

    expect(columns.length).toEqual(totalColumnSize);
  });

  it('should populate table with updated message', () => {

    const message = [
      {
        mRID: 'cMXuV56s1_m3vf2YXYfJfQ',
        source: 'ENTSOE',
        revisionNumber: 2,
        country: 'Sweden',
        biddingZone: '10YSE-1--------K',
        eventStatus: 'ACTIVE',
        typeOfEvent: 'A78',
        typeOfUnavailability: 'A54',
        affectedAssetOrUnit: 'Slupsk-Sternö (SwePol Link)',
        published: '2022-12-07T13:39:48',
        eventStart: '2022-12-03T17:00:00',
        eventEnd: '2022-12-03T18:00:00',
        availableCapacity: 0,
        installedCapacity: 0,
        unavailableCapacity: 0,
        unitOfMeasure: 'MAW',
        countryCode: 'SE',
      },
    ];

    component.dataSource.data = message
    fixture.detectChanges();
    expect(component.dataSource.data).toEqual(message);
  });

  it('should handle undefined or null values', () => {

    const message = [...UMM,
      {
        mRID: undefined,
        source:null,
        revisionNumber: null,
        country: null,
        biddingZone: null,
        eventStatus: null,
        typeOfEvent: undefined,
        typeOfUnavailability: null,
        affectedAssetOrUnit: null,
        published: null,
        eventStart: null,
        eventEnd: null,
        availableCapacity: undefined,
        installedCapacity: null,
        unavailableCapacity: undefined,
        unitOfMeasure: null,
        fuelType: undefined,
        countryCode: null,
      },
    ];

    component.dataSource.data = message
    fixture.detectChanges();
    expect(component.dataSource.data).toBeDefined();
  });

  it('should set up sorting', () => {
    const sort = component.dataSource.sort;
    expect(sort).toBeInstanceOf(MatSort);
  });

  it('should return column header if sorting key not provided', () => {
    const column = {
      header: 'Source',
      key: 'source',
      sortingkey: undefined,
      sortable: false,
    };
    const result = component.sortingKey(column);
    expect(result).toEqual(column.header);
  });
});
