import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  UrgentMarketMessageTableColumn,
  TableColumn,
} from 'src/app/models/umm-entries.model';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { UrgentMarketMessageTableColumns } from 'src/app/data/table.data';
import { UrgentMarketMessageEntry } from 'src/app/enums/umm-entries';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);

  headers = this.generateHeaders();
  displayedHeaders = this.headers.map((c) => c.header);

  @Input()
  dataSource = new MatTableDataSource();
  @Input()
  isLoadingResults: boolean;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private urgentMarketMessage: UrgentMarketMessagesService
  ) {}

  private generateColumns(): UrgentMarketMessageTableColumn<TableColumn>[] {
    let columns: UrgentMarketMessageTableColumn<TableColumn>[] = [];

    UrgentMarketMessageTableColumns.forEach((column) => {
      if (column.subcolumns !== undefined) {
        column.subcolumns.forEach((subcolumn) => {
          columns.push({
            key: subcolumn.key,
            header: subcolumn.header,
            sortable: subcolumn.sortable,
          });
        });
      } else {
        columns.push({
          key: column.key,
          header: column.header,
          sortable: column.sortable,
        });
      }
    });

    return columns;
  }

  generateHeaders(): UrgentMarketMessageTableColumn<TableColumn>[]{
    let headers: UrgentMarketMessageTableColumn<TableColumn>[] = [];

    UrgentMarketMessageTableColumns.forEach((column) => {
      headers.push({
        key: column.key,
        header: column.header,
        sortable: column.sortable,
      });
    });
    console.log(headers);
    return headers;
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

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.createFilters();
  }

  private createFilters<T>(): (data: T, filter: string) => boolean {
    const filterFunction = function (data: T, filter: string): boolean {
      const searchTerms: Partial<Record<keyof T, string>> = JSON.parse(filter);
      if (searchTerms === null || searchTerms === undefined) {
        return true;
      }

      return Object.keys(searchTerms).every((key) => {
        if (Array.isArray(searchTerms[key])) {
          return searchTerms[key]?.length > 0
            ? searchTerms[key].every((term: string) =>
                Array.isArray(data[key])
                  ? data[key].includes(term)
                  : data[key] === term
              )
            : true;
        }

        return (
          data[key]?.toLowerCase()?.indexOf(searchTerms[key]?.toLowerCase()) !==
          -1
        );
      });
    };

    return filterFunction;
  }

  rowClick(umm) {
    return this.urgentMarketMessage.getUMM(umm.id).subscribe((data) => {
      // this.dataSource.data = data;
    });
  }
}
