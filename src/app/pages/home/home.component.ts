import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import { Filter } from 'src/app/models/filter-infrastructure.model';
import { FilterParams, QueryString } from 'src/app/models/filter-params.model';
import { FiltersInfrastructure } from 'src/app/data/filter.data';
import UMMJSON from 'src/app/UMM.json';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { WebSocketConnectionService } from 'src/app/services/websocket-connection.service';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';
import {
  FilterInfrastructure,
  FilterInfrastructureQueryKeys,
} from 'src/app/enums/filter-infrastructure';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private urgentMarketMessage: UnavailabilityMarketMessagesService,
    private webSocketConnectionService: WebSocketConnectionService
  ) {
    this.loadMessages();
  }

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isLoadingOptions = true;

  optionFilters: Filter<FilterParams>[];

  activeState: string;
  formGroup = new FormGroup({});
  data: IUnavailabilityMarketMessage[];
  filterQuery: QueryString;

  selectedFilter: string;

  setStateAsActive(state) {
    this.activeState = state;
  }

  ngOnInit() {
    this.optionFilters = this.loadLocalOptionFilters();
    this.addFilterControls();

    this.formGroup.valueChanges.subscribe(() => {
      this.filterQuery = this.convertFilterParamsToQuery();
      console.log(this.filterQuery);
    });
  }

  unselectFormControls(name: string) {
    Object.keys(this.formGroup.controls).forEach((key) => {
      const currentControl: FormControl = this.formGroup.controls[key];
      if (currentControl.touched && key !== name) {
        currentControl.reset();
      }
    });
  }

  convertFilterParamsToQuery(): QueryString {
    let filterValue: QueryString = {};

    Object.keys(this.formGroup.controls).forEach((key) => {
      const filter = this.formGroup.controls[key].value;
      if (key === FilterInfrastructureQueryKeys.publicationDate) {
        filterValue[key] = JSON.stringify(filter);
      } else {
        filterValue[key] = filter.map((item) => item.code);
      }
    });

    return filterValue;
  }

  addFilterControls() {
    FiltersInfrastructure.forEach((filter) => {
      this.formGroup.addControl(
        filter.endpoint,
        new FormControl(filter.defaultValue ?? [], { nonNullable: true })
      );
    });
  }

  loadMessages() {
    // let uri : string = 'wss://bpr.webpubsub.azure.com:443/client/hubs/BPR?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzAxNjUyMzMsImV4cCI6MTY3MDE2ODgzMywiaWF0IjoxNjcwMTY1MjMzLCJhdWQiOiJodHRwczovL2Jwci53ZWJwdWJzdWIuYXp1cmUuY29tL2NsaWVudC9odWJzL0JQUiJ9.XajZ82Zjb_-GVT5-PRXo4z1z8aKQIszqhSmzuQsyU3M'

    // this.webSocketConnectionService
    //   .subscribeToWebSocket(uri)
    //   .subscribe(
    //     (data : UnavailabilityMarketMessagesService[])=> {
    //       this.isLoadingResults = false;
    //       this.dataSource.data = data;
    //     },
    //     (err) => console.error(err)
    //   );

    this.isLoadingResults = false;
    this.data = UMMJSON as unknown as IUnavailabilityMarketMessage[];
    this.dataSource.data = this.data;
  }

  filter() {
    this.urgentMarketMessage.getUMMS(this.filterQuery).subscribe((data) =>{
      this.dataSource.data = data
    });
  }

  clear() {
    this.formGroup.reset();
  }

  loadLocalOptionFilters(): Filter<FilterParams>[] {
    FiltersInfrastructure.forEach((filter, index) => {
      if (!filter.isDateFilter) {
        let option = JSON.parse(localStorage.getItem(filter.endpoint));
        if (option === null) {
          this.requestOptionFilter(filter);
        } else {
          FiltersInfrastructure[index].options = option;
        }
      }
    });

    return FiltersInfrastructure;
  }

  requestOptionFilter(filter: Filter<FilterParams>): FilterParams[] {
    this.urgentMarketMessage.getFilterOptions(filter.endpoint).subscribe(
      (data: FilterParams[]) => {
        localStorage.setItem(filter.endpoint, JSON.stringify(data));
        return (filter.options = data);
      },
      (error) => console.log(error),
      () => (this.isLoadingOptions = false)
    );
    return filter.options;
  }
}
