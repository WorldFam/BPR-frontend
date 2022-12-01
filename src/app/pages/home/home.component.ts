import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UrgentMarketMessagesService } from 'src/app/services/table/urgent-market-messages.service';
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
import { FilterInfrastructureEndpoint } from 'src/app/enums/filter-infrastructure';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private urgentMarketMessage: UrgentMarketMessagesService
  ) {
    this.loadMessages();
  }

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isLoadingOptions = true;

  optionFilters: OptionFilter<OptionFilterParams>[];
  dateFilters: DateFilter[];

  activeState: string;
  optionFormGroup = new FormGroup({});
  dateFormGroup = new FormGroup({});

  setStateAsActive(state) {
    this.activeState = state;
  }

  ngOnInit() {
    this.optionFilters = this.loadOptionFilters();
    this.dateFilters = DateFilters;

    this.addDateControls();
    this.addOptionControls();

    merge(this.optionFormGroup.valueChanges, this.dateFormGroup.valueChanges)
      .pipe(distinctUntilChanged(), throttleTime(10))
      .subscribe(() => {
        let filterOptionQuery: QueryString = this.convertOptionsToQuery(
          this.optionFormGroup.value as OptionFilterParams
        );
        let filterDateQuery: QueryString = this.convertDateToQuery(
          this.dateFormGroup.value as DateFilterParams
        );
        let mergedFilterQuery: QueryString = {
          ...filterOptionQuery,
          ...filterDateQuery,
        };

        console.log(mergedFilterQuery);
        this.urgentMarketMessage.getUMMS(mergedFilterQuery);
      });
  }

  convertDateToQuery(data: DateFilterParams): QueryString {
    let filterValue: QueryString = {};

    Object.entries(data).forEach(([key, value]) => {
      let dateNotSet: boolean = Object.values(data[key]).every(
        (value) => value === null
      );
      if (dateNotSet) {
        filterValue[key] = [];
      } else {
        filterValue[key] = JSON.stringify(value);
      }
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
      if (filter.endpoint === FilterInfrastructureEndpoint.publicationDate) {
        this.dateFormGroup.addControl(
          filter.endpoint,
          new FormGroup({
            start: new FormControl(filter.defaultStartDate, {
              nonNullable: true,
            }),
            end: new FormControl(filter.defaultEndDate, { nonNullable: true }),
          })
        );
      } else
        this.dateFormGroup.addControl(
          filter.endpoint,
          new FormGroup({
            start: new FormControl(filter.defaultStartDate, {
              nonNullable: true,
            }),
            end: new FormControl(filter.defaultEndDate, { nonNullable: true }),
          })
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
    // return this.urgentMarketMessage.getUMMS().subscribe((data) => {
    this.isLoadingResults = false;
    //   this.dataSource.data = data;
    // });
    return (this.dataSource.data = UMMJSON);
  }

  clearFilters() {
    this.optionFormGroup.reset();
    this.dateFormGroup.reset();
  }

  loadOptionFilters(): OptionFilter<OptionFilterParams>[] {
    const forkRequest = OptionFilters.map((filter) =>
      this.urgentMarketMessage.getFilterOptions(filter.endpoint)
    );
    forkJoin(forkRequest).subscribe(
      (data) =>
        data.forEach((option: OptionFilterParams[], index) => {
          return (OptionFilters[index].options = option);
        }),
      (error) => console.log(error),
      () => (this.isLoadingOptions = false)
    );
    return OptionFilters;
  }
}
