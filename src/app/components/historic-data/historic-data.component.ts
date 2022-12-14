import {
  Component,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  UnavailabilityMarketMessageTableColumn,
  TableColumn,
} from 'src/app/models/dashboard/table-entries.model';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { UnavailabilityMarketMessageTableColumns } from 'src/app/data/historic-table.data';
import { ActivatedRoute } from '@angular/router';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';

@Component({
  selector: 'app-historic-data',
  templateUrl: './historic-data.component.html',
  styleUrls: ['./historic-data.component.css'],
})
export class HistoricDataComponent implements OnInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);

  headers = this.generateHeaders();
  displayedHeaders = this.headers.map((c) => c.header);

  dataSource = new MatTableDataSource();;

  @Input()
  isLoadingResults: boolean;

  constructor(
    private urgentMarketMessage: UnavailabilityMarketMessagesService
,
private route: ActivatedRoute  ) {}

  private generateColumns(): UnavailabilityMarketMessageTableColumn<TableColumn>[] {
    let columns: UnavailabilityMarketMessageTableColumn<TableColumn>[] = [];

    UnavailabilityMarketMessageTableColumns.forEach((column) => {
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

  generateHeaders(): UnavailabilityMarketMessageTableColumn<TableColumn>[]{
    let headers: UnavailabilityMarketMessageTableColumn<TableColumn>[] = [];

    UnavailabilityMarketMessageTableColumns.forEach((column) => {
      headers.push({
        key: column.key,
        header: column.header,
        sortable: column.sortable,
      });
    });
    return headers;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const params = {
      id : id
    }
    this.urgentMarketMessage.getUrgentMarketMessages(params).subscribe((data :any)=> {
      this.dataSource.data = data;
    })
    this.dataSource.sort = this.sort;
  }

  sortingKey(column : UnavailabilityMarketMessageTableColumn<TableColumn>){
    if(column.sortingkey === undefined){
      return column.header
    }
    return column.key;
  }
}

