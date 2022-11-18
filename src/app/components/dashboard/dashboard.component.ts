import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UmmEntries, UmmEntriesHeaders } from 'src/app/enums/umm-entries';
import { UMMTableColumn, UMM } from 'src/app/models/model';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);

  columnHead = this.generateColumnsHeaders();
  columnHeaders = this.columnHead.map((c) => c.key);

  @Input() 
  dataSource = new MatTableDataSource();
  @Input() 
  isLoadingResults : boolean;

  constructor(private _liveAnnouncer: LiveAnnouncer, private urgentMarketMessage: UrgentMarketMessagesService, private router: Router) {
    
  }

  private generateColumns(): UMMTableColumn[] {
    let columns: UMMTableColumn[] = [];
    Object.entries(UmmEntries).forEach(([key, value]) => {
      columns.push({
        key: key,
        header: value,
        sortable: true,
      });
    });
    return columns;
  }

  private generateColumnsHeaders(): UMMTableColumn[] {
    let columns: UMMTableColumn[] = [];
    Object.entries(UmmEntriesHeaders).forEach(([key, value]) => {
      columns.push({
        key: key,
        header: value,
        sortable: key === 'capacity1' ? false : true,
      });
    });
    console.log(columns)
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

  rowClick(umm: UMM) {
    return this.urgentMarketMessage.getUMM(umm.id).subscribe(data  => {
      // this.dataSource.data = data;
    });
  }

}

