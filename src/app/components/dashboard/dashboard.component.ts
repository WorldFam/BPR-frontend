import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import UMMJSON from './UMM.json';

interface UMM {
  source: string;
  country: string;
  biddingZone: string;
  eventStatus: string;
  typeOfEvent: string;
  typeOfUnavailability: string;
  affectedAssetOrUnit: string;
  published: string;
  eventStart: string;
  eventEnd: string;
  availableCapacity: number;
  installedCapacity: number;
  unavailableCapacity: number;
  unitOfMeasure: string;
}

interface UMMTableColumn {
  key: string;
  header: UMMHeader;
  sortable: boolean;
  // cell: (umm: UMM) => string | number | Date;
}

enum UMMHeader {
  source = 'Source',
  country = 'Country',
  biddingZone = 'Bidding Zone',
  eventStatus = 'Event Status',
  typeOfEvent = 'Type of Event',
  typeOfUnavailability = 'Type of Unavailability',
  affectedAssetOrUnit = 'Affected Asset or Unit',
  published = 'Published',
  eventStart = 'Event Start',
  eventEnd = 'Event End',
  availableCapacity = 'Available Capacity',
  installedCapacity = 'Intstalled Capacity',
  unavailableCapacity = 'Unavailable Capacity',
  unitOfMeasure = 'Unit of Measure',
}

export enum UMMKey {
  source,
  country,
  biddingZone,
  eventStatus,
  typeOfEvent,
  typeOfUnavailability,
  affectedAssetOrUnit,
  published,
  eventStart,
  eventEnd,
  availableCapacity,
  installedCapacity,
  unavailableCapacity,
  unitOfMeasure,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  // columns: UMMTableColumn[] = [
  //   {
  //     key: UMMKey[UMMKey.source],
  //     header: UMMHeader.source,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.source}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.country],
  //     header: UMMHeader.country,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.country}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.biddingZone],
  //     header: UMMHeader.biddingZone,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.biddingZone}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.eventStatus],
  //     header: UMMHeader.eventStatus,
  //     sortable: true,
  //     cell: (umm: UMM) => umm.eventStatus,
  //   },
  //   {
  //     key: UMMKey[UMMKey.typeOfEvent],
  //     header: UMMHeader.typeOfEvent,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.typeOfEvent}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.typeOfUnavailability],
  //     header: UMMHeader.typeOfUnavailability,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.typeOfUnavailability}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.affectedAssetOrUnit],
  //     header: UMMHeader.affectedAssetOrUnit,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.affectedAssetOrUnit}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.published],
  //     header: UMMHeader.published,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.published}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.eventStart],
  //     header: UMMHeader.eventStart,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.eventStart}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.eventEnd],
  //     header: UMMHeader.eventEnd,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.eventEnd}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.availableCapacity],
  //     header: UMMHeader.availableCapacity,
  //     sortable: false,
  //     cell: (umm: UMM) => umm.availableCapacity,
  //   },
  //   {
  //     key:UMMKey[UMMKey.installedCapacity],
  //     header: UMMHeader.installedCapacity,
  //     sortable: false,
  //     cell: (umm: UMM) => `${umm.installedCapacity}`,
  //   },
  //   {
  //     key: UMMKey[UMMKey.unavailableCapacity],
  //     header: UMMHeader.unavailableCapacity,
  //     sortable: true,
  //     cell: (umm: UMM) => `${umm.unavailableCapacity}`,
  //   },
  //   {
  //     key:  UMMKey[UMMKey.unitOfMeasure],
  //     header: UMMHeader.unitOfMeasure,
  //     sortable: false,
  //     cell: (umm: UMM) => `${umm.unitOfMeasure}`,
  //   },
  // ];

  columns = this.generateColumns()
  displayedColumns = this.columns.map((c) => c.key);
  dataSource = new MatTableDataSource(UMMJSON);
  isLoadingResults = false;

  
  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient) {
    // this.http.get<Document[]>(this.url).subscribe(data => {
    //   this.items = data
    //   console.log(this.items)})     

  }

  private generateColumns(): UMMTableColumn[] {
  let columns : UMMTableColumn[] = []
  Object.entries(UMMHeader).forEach(([key, value]) => {
    columns.push({
      key: key,
      header: value,
      sortable : true,
    })
  });
  console.log(columns)
  return columns
  }


  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

