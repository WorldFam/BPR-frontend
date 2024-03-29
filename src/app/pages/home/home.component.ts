import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import { Filter } from 'src/app/models/dashboard/filter-infrastructure.model';
import {
  FilterParams,
  QueryString,
} from 'src/app/models/api/filter-params.model';
import { FiltersInfrastructure } from 'src/app/data/filter.data';
import { FormGroup, FormControl } from '@angular/forms';
import { WebSocketConnectionService } from 'src/app/services/websocket/websocket-connection.service';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';
import UMM from 'src/app/UMM.json';
import { FilterInfrastructureQueryKeys } from 'src/app/models/enums/filter-infrastructure';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private unavailabilityMarketMessagesService: UnavailabilityMarketMessagesService,
    private webSocketConnectionService: WebSocketConnectionService
  ) {}

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isLoadingOptions = true;

  optionFilters: Filter<FilterParams>[];

  formGroup = new FormGroup({});
  data: IUnavailabilityMarketMessage[];
  filterQuery: QueryString;

  selectedFilter: string;

  ngOnInit() {
    this.filter();
    this.optionFilters = this.loadLocalOptionFilters();
    this.addFilterControls();

    this.formGroup.valueChanges.subscribe(() => {
      this.filterQuery = this.convertFilterParamsToQuery();
    });
  }

  async ngAfterViewInit() {
    this.webSocketConnectionService
    .subscribeToWebSocket(
      await this.webSocketConnectionService.getUriAndConnectToPubSub()
    )
    .subscribe((data: UnavailabilityMarketMessagesService[]) => {
      this.isLoadingResults = false;
      this.dataSource.data = data;
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
        if (filter.length !== 0) {
          filterValue[key] = filter.toLocaleDateString('fr-CA')  ;
        }
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
        new FormControl([], { nonNullable: true })
      );
    });
  }

  async loadMessages() {
    this.webSocketConnectionService
      .subscribeToWebSocket(
        await this.webSocketConnectionService.getUriAndConnectToPubSub()
      )
      .subscribe((data: UnavailabilityMarketMessagesService[]) => {
        this.isLoadingResults = false;
        this.dataSource.data = data;
      });
  }

  filter() {
    console.log(this.filterQuery);
    this.unavailabilityMarketMessagesService
      .getUrgentMarketMessages(this.filterQuery)
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.dataSource.data = data;
      });
  }

  clear() {
    this.formGroup.reset();
    this.filter();
  }

  loadLocalOptionFilters(): Filter<FilterParams>[] {
    FiltersInfrastructure.forEach((filter, index) => {
      if (!filter.isDateFilter) {
        let option = JSON.parse(sessionStorage.getItem(filter.endpoint));
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
    this.unavailabilityMarketMessagesService
      .getFilterOptions(filter.endpoint)
      .subscribe(
        (data: FilterParams[]) => {
          sessionStorage.setItem(filter.endpoint, JSON.stringify(data));
          return (filter.options = data);
        },
        (error) => console.log(error),
        () => (this.isLoadingOptions = false)
      );
    return filter.options;
  }
}
