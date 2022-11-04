import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { UMMEntries } from 'src/app/enums/enum';
import { UMMTableColumn } from 'src/app/models/model';

import UMMJSON from './UMM.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);
  dataSource = new MatTableDataSource(UMMJSON);
  isLoadingResults = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient) {
    // this.http.get<Document[]>(this.url).subscribe(data => {
    //   this.items = data
    //   console.log(this.items)})
  }

  private generateColumns(): UMMTableColumn[] {
    let columns: UMMTableColumn[] = [];
    Object.entries(UMMEntries).forEach(([key, value]) => {
      columns.push({
        key: key,
        header: value,
        sortable: true,
      });
    });
    return columns;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
