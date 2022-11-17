import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity,
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { FilterComponent } from 'src/app/components/filter/filter.component';
7;
import { InfrastructureConstants } from 'src/app/constants/constants';

import { FILTEROPT } from 'src/app/data/filter.data';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, toArray, concatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private urgentMarketMessage: UrgentMarketMessagesService,
    fb: FormBuilder
  ) {
    // this.loadMessages()
    // this.loadFilterOptions();
  }

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  source = new FormControl();
  filters: any[];
  myControls: FormControl[] = [];

  ngOnInit() {
    this.source.valueChanges.subscribe((data) => {
      console.log(data);
    });

    this.filters = this.loadFilterOptions();
  }

  loadMessages() {
    return this.urgentMarketMessage.getUMMS().subscribe((data) => {
      this.isLoadingResults = false;
      this.dataSource.data = data;
    });
  }

  loadFilterOptions(): UrgentMarketMessagesInfrastructure<FilterEntity>[] {
    const forkRequest = FILTEROPT.map((endpoint) => this.urgentMarketMessage.getFilterOptions(endpoint.endpoint));
    forkJoin(forkRequest).subscribe(data => 
        data.forEach((option : FilterEntity[], index) => {
          return FILTEROPT[index].options = option;
        })
      );
    return FILTEROPT;
  }

  // loadFilterOptions() :  UrgentMarketMessagesInfrastructureClass[]{
  //   let urgentList: UrgentMarketMessagesInfrastructureClass[] = [];

  //   Infrastructure.forEach(endpoint => this.urgentMarketMessage.getFilterOptions(endpoint).subscribe(data => {
  //     data.map((res : SetFilter[]) => {
  //       console.log(res)
  //       const urgent = new UrgentMarketMessagesInfrastructureClass(endpoint,res);
  //        return urgentList.push(urgent)
  //     })
  //   }));
  //   console.log(urgentList)
  //   return urgentList;
  // }

  // loadFilterOptions() :  UrgentMarketMessagesInfrastructureClass[]{
  //   let urgentList: UrgentMarketMessagesInfrastructureClass[] = [];
  //   Infrastructure.forEach(endpoint => this.urgentMarketMessage.getFilterOptions(endpoint).pipe(
  //     map((res) => {
  //       console.log(res)
  //       const urgent = new UrgentMarketMessagesInfrastructureClass(endpoint,[]);
  //       //fill the person props from response
  //       return urgentList.push(urgent)
  //     })));
  //   //console.log(urgentList)
  //   return urgentList;
  // }

  filterMessages(params: string) {
    // this.filterValues.country = params
    // console.log(this.filterValues.country)
    // return this.urgentMarketMessage.getUMMS().subscribe(data  => {
    //   this.loadMessages();
    // });
  }
}
