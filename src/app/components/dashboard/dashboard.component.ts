import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  UnavailabilityMarketMessageTableColumn,
  TableColumn,
} from 'src/app/models/dashboard/table-entries.model';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { UnavailabilityMarketMessageTableColumns } from 'src/app/data/table.data';
import { HistoricMessageTableColumns } from 'src/app/data/historic-table.data';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  columns: UnavailabilityMarketMessageTableColumn<TableColumn>[];
  displayedColumns: string[];
  headers: UnavailabilityMarketMessageTableColumn<TableColumn>[];
  displayedHeaders: string[];

  @Input()
  dataSource = new MatTableDataSource();
  @Input()
  isLoadingResults: boolean;

  paramId: string;

  constructor(
    private urgentMarketMessage: UnavailabilityMarketMessagesService,
    private router: Router,
    private params: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramId = this.params.snapshot.params['id'];

    if (this.paramId) {
      const params = {
        id: this.paramId,
      };
      this.urgentMarketMessage
        .getUrgentMarketMessages(params)
        .subscribe((data: any) => {
          this.dataSource.data = data;
        });
    }

    this.columns = this.generateColumns();
    this.displayedColumns = this.columns.map((c) => c.key);

    this.headers = this.generateHeaders();
    this.displayedHeaders = this.headers.map((c) => c.header);
  }

  generateColumns(): UnavailabilityMarketMessageTableColumn<TableColumn>[] {
    let columns: UnavailabilityMarketMessageTableColumn<TableColumn>[] = [];

    let tableColumns = this.paramId
      ? HistoricMessageTableColumns
      : UnavailabilityMarketMessageTableColumns;
    tableColumns.forEach((column) => {
      if (column.hasOwnProperty('subcolumns')) {
        column.subcolumns.forEach((subcolumn) => {
          columns.push({
            key: subcolumn.key,
            header: subcolumn.header,
            sortable: subcolumn.sortable,
            sortingkey: subcolumn.sortingkey,
          });
        });
      } else {
        columns.push({
          key: column.key,
          header: column.header,
          sortable: column.sortable,
          sortingkey: column.sortingkey,
        });
      }
    });

    return columns;
  }

  generateHeaders(): UnavailabilityMarketMessageTableColumn<TableColumn>[] {
    let headers: UnavailabilityMarketMessageTableColumn<TableColumn>[] = [];

    let tableHeaders = this.paramId
      ? HistoricMessageTableColumns
      : UnavailabilityMarketMessageTableColumns;

    tableHeaders.forEach((column) => {
      headers.push({
        key: column.key,
        header: column.header,
        sortable: column.sortable,
      });
    });
    return headers;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  sortingKey(column: UnavailabilityMarketMessageTableColumn<TableColumn>) {
    if (column.sortingkey === undefined) {
      return column.header;
    }
    return column.key;
  }

  rowClick(umm: IUnavailabilityMarketMessage) {
    if (!this.paramId) {
      this.router.navigate([`historic-data/${umm.mRID}`]);
    }
  }
}
