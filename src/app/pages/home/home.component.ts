import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UnavailabilityMarketMessagesService } from 'src/app/services/dashboard/unavailability-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  OptionFilter,
  DateFilter,
} from 'src/app/models/filter-infrastructure.model';
import {
  OptionFilterParams,
  QueryString,
  DateFilterParams,
} from 'src/app/models/filter-params.model';
import { OptionFilters, DateFilters } from 'src/app/data/filter.data';
import { forkJoin, merge } from 'rxjs';
import UMMJSON from 'src/app/UMM.json';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterInfrastructureQueryKeys } from 'src/app/enums/filter-infrastructure';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { WebSocketConnectionService } from 'src/app/services/websocket-connection.service';
import { IUnavailabilityMarketMessage } from 'src/app/models/api/unavailability-market-message.model';
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

  optionFilters: OptionFilter<OptionFilterParams>[];
  dateFilters: DateFilter[];
  mergedFilterQuery: QueryString;

  activeState: string;
  optionFormGroup = new FormGroup({});
  dateFormGroup = new FormGroup({});
  data: IUnavailabilityMarketMessage[];

  private sub: any;

  setStateAsActive(state) {
    this.activeState = state;
  }

  ngOnInit() {
    this.optionFilters = this.loadLocalOptionFilters();
    this.dateFilters = DateFilters;

    this.addDateControls();
    this.addOptionControls();

    this.sub = merge(this.optionFormGroup.valueChanges, this.dateFormGroup.valueChanges)
      .pipe(distinctUntilChanged(), throttleTime(10))
      .subscribe(() => {
        let filterOptionQuery: QueryString = this.convertOptionsToQuery(
          this.optionFormGroup.value as OptionFilterParams
        );
        let filterDateQuery: QueryString = this.convertDateToQuery(
          this.dateFormGroup.value as DateFilterParams
        );
        this.mergedFilterQuery = {
          ...filterOptionQuery,
          ...filterDateQuery,
        };

        console.log(this.mergedFilterQuery);
      });

    this.optionFormGroup.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
}

  convertDateToQuery(data: DateFilterParams): QueryString {
    let filterValue: QueryString = {};

    Object.entries(data).forEach(([key, value]) => {
      filterValue[key] = JSON.stringify(value);
    });

    return filterValue;
  }

  convertOptionsToQuery(data: OptionFilterParams): QueryString {
    let filterValue: QueryString = {};

    Object.entries(data).forEach(([key, value]) => {
      filterValue[key] = value.map((item) => item.code);
    });

    return filterValue;
  }

  addDateControls() {
    DateFilters.forEach((filter) => {
      this.dateFormGroup.addControl(
        filter.endpoint,
        new FormControl([], { nonNullable: true })
      );
    });
  }

  addOptionControls() {
    OptionFilters.forEach((filter) => {
      this.optionFormGroup.addControl(
        filter.endpoint,
        new FormControl([], { nonNullable: true })
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
    console.log(this.dataSource.data);
  }

  filter() {
    this.dateFormGroup.reset();
    this.urgentMarketMessage.getUMMS(this.mergedFilterQuery);
  }

  loadLocalOptionFilters(): OptionFilter<OptionFilterParams>[] {
    OptionFilters.forEach((filter, index) => {
      let option = JSON.parse(localStorage.getItem(filter.endpoint));
      if (option === null) {
         this.requestOptionFilter(filter);
      } else {
        OptionFilters[index].options = option;
      }
    });

    return OptionFilters;
  }

  requestOptionFilter(
    filter: OptionFilter<OptionFilterParams>
  ): OptionFilterParams[] {
    this.urgentMarketMessage.getFilterOptions(filter.endpoint).subscribe(
      (data: OptionFilterParams[]) => {
        localStorage.setItem(filter.endpoint, JSON.stringify(data));
        return (filter.options = data);
      },
      (error) => console.log(error),
      () => (this.isLoadingOptions = false)
    );
    return filter.options;
  }
}
