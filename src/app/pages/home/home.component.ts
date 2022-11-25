import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity,FilterParams, EntityParams
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { HttpParams } from '@angular/common/http';

import { FILTEROPT } from 'src/app/data/filter.data';

import { forkJoin } from 'rxjs';
import UMMJSON from 'src/app/data/UMM.json';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private urgentMarketMessage: UrgentMarketMessagesService,
    private formBuilder: FormBuilder, 
  ) {
    this.loadMessages()
  }

  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  isLoadingOptions = true;

  filters: UrgentMarketMessagesInfrastructure<FilterEntity>[];

  activeState: string;
  form = new FormGroup({});

  setStateAsActive(state) {
    this.activeState = state;
  }

  ngOnInit() {
    this.filters = this.loadFilterOptions();

    this.filters.forEach((filter) => {
      // console.log(this.formControlNames[index])

      this.form.addControl(filter.endpoint, new FormControl([], {nonNullable: true}))
    })

    this.form.valueChanges.subscribe((data: FilterEntity ) => {
      let filterValue : FilterParams = {}

      // send only code 
      Object.entries(data).forEach(([key, value]) => {
        data[key] = value.map((item) => item.code);
      })

      Object.assign(filterValue, data)
      this.filterMessages(filterValue)
    })



    // this.form.valueChanges.subscribe(data => {console.log(data)})
  }



 
  // getAllAsFormArray(): Observable<FormArray> {
  //   return this.getAll().pipe(map((albums: Album[]) => {
  //     // Maps all the albums into a formGroup defined in tge album.model.ts
  //     const fgs = albums.map(Album.asFormGroup);
  //     return new FormArray(fgs);
  //   }));
  // }

  loadMessages() {
    // return this.urgentMarketMessage.getUMMS().subscribe((data) => {
      this.isLoadingResults = false;
    //   this.dataSource.data = data;
    // });
    return this.dataSource.data = UMMJSON;
  }

  clearFilters(){
    this.form.reset()
  }

  loadFilterOptions(): UrgentMarketMessagesInfrastructure<FilterEntity>[] {
    const forkRequest = FILTEROPT.map((endpoint) =>
      this.urgentMarketMessage.getFilterOptions(endpoint.endpoint)
    );
    forkJoin(forkRequest).subscribe(
      (data) =>
        data.forEach((option: FilterEntity[], index) => {
          return (FILTEROPT[index].options = option);
        }),
      (error) => console.log(error),
      () => (this.isLoadingOptions = false)
    );
    console.log(FILTEROPT)
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

  filterMessages(filterValues : FilterParams) {
    
    // let key;
    // let value; 
    // Object.keys(filterValues).forEach(keys => key = keys)
    // Object.values(filterValues).forEach(values => value = values)
    // console.log(key)
    // console.log(value)

    let params = new HttpParams({fromObject: filterValues});
    
    console.log(params.toString())


    // if(params.has(key)){
    //   params.append(key,value)
    // }
    
    // console.log(params.toString())

    // params.values.forEach((value) => {
    //   filterParams[params.key] = value.code;
    //   console.log(filterParams)
      // this.urgentMarketMessage.getUMMS(filterParams).subscribe((data) => {
      //   this.isLoadingResults = false;
      //   this.dataSource.data = data;
      // });
    // })

    

    
    // this.filterValues.key = params.key
    // this.filterValues.key = params.key
    
    // params.value[params.value.length - 1]

    // this.urgentMarketMessage.getUMMS(filterParams).subscribe((data) => {
    //   this.isLoadingResults = false;
    //   this.dataSource.data = data;
    // });

  }
  //https://stoplight.io/mocks/bpr-infrastructure/infrastructure/109335189?areas=10YAT-APG------L&areas=10YAT-APG------W
}
