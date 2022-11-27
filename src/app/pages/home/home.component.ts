import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  OptionFilter,
  DateFilter,
  FilterParams,
  QueryString,
  Filter,
  DateFilterParams,
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { HttpParams } from '@angular/common/http';

import { OptionFilters, DateFilters } from 'src/app/data/filter.data';
import { combineLatest, forkJoin, merge } from 'rxjs';
import UMMJSON from 'src/app/data/UMM.json';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Infrastructure,
  InfrastructureEndpoint,
} from 'src/app/enums/umm-entries';
import { map, mergeAll, startWith } from 'rxjs/operators';

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

  optionFilters: OptionFilter<FilterParams>[];
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

    combineLatest([
      this.optionFormGroup.valueChanges.pipe(
        startWith(this.optionFormGroup.value)
      ),
      this.dateFormGroup.valueChanges.pipe(startWith(this.dateFormGroup.value)),
    ]).subscribe(([option, date]) => {
      let filterOptions: QueryString = this.filterOptions(option as FilterParams);
      let filterDate: QueryString = this.filterDate(date as DateFilterParams);
      let combinedData: QueryString = {...filterDate,...filterOptions};
      this.filterMessages(combinedData);
    });
  }

  filterDate(data: DateFilterParams): QueryString {
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

  filterOptions(data: FilterParams): QueryString {
    let filterValue: QueryString = {};

    Object.entries(data).forEach(([key, value]) => {
      filterValue[key] = value.map((item) => item.code);
    });

    return filterValue;
  }

  addDateControls() {
    let date = new Date();
    const weekDays = 7;

    DateFilters.forEach((filter) => {
      if (filter.endpoint === InfrastructureEndpoint.publicationDate) {
        this.dateFormGroup.addControl(
          filter.endpoint,
          new FormGroup({
            start: new FormControl(null, { nonNullable: true }),
            end: new FormControl(null, { nonNullable: true }),
          })
        );
      } else
        this.dateFormGroup.addControl(
          filter.endpoint,
          new FormGroup({
            start: new FormControl(new Date(date), { nonNullable: true }),
            end: new FormControl(
              new Date(date.setDate(date.getDate() + weekDays)),
              { nonNullable: true }
            ),
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

  loadOptionFilters(): OptionFilter<FilterParams>[] {
    const forkRequest = OptionFilters.map((filter) =>
      this.urgentMarketMessage.getFilterOptions(filter.endpoint)
    );
    forkJoin(forkRequest).subscribe(
      (data) =>
        data.forEach((option: FilterParams[], index) => {
          return (OptionFilters[index].options = option);
        }),
      (error) => console.log(error),
      () => (this.isLoadingOptions = false)
    );
    return OptionFilters;
  }

  filterMessages(filterValuesObject) {
    let params = new HttpParams({
      fromObject: filterValuesObject,
    });

    console.log(params.toString());
  }
}
