import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity,
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { __values } from 'tslib';

@Component({
  selector: 'app-filter-opt',
  templateUrl: './filter-opt.component.html',
  styleUrls: ['./filter-opt.component.css'],
})
export class FilterOptComponent implements OnInit {
  @Input()
  options: UrgentMarketMessagesInfrastructure<FilterEntity>;

  // @Input()
  // name: string;

  filterControl = new FormControl();

  @Output()
  selectedOptions = new EventEmitter<string>();

  filteredOptions: Observable<any[]>;
  searchControl = new FormControl();
  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith<string>(''),
      map((name) => this._filter(name, this.options))
    );

    //will be assigned data from httpcall
    this.filterControl.valueChanges.subscribe(value => {
      this.selectedOptions.emit(value)
      // this.filterValues.source = value
      // const params = new HttpParams({fromObject: this.filterValues});
      // if(this.filterValues.source.includes('source1')){
      //   params.append('source', value);
      // }
      // this.urgentMarketMessage.getUMMS(this.filterValues).subscribe(data  => {
      //   this.dataSource.data = data;
      // });
      // console.log(  this.filterValues.source)
      // this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  private _filter<T>(name: string, infrastructure: UrgentMarketMessagesInfrastructure<T>): FilterEntity[] {
    const filterValue = name.toUpperCase();   
    let filterList = infrastructure.options.filter((option : any) => {
      // type Keys = keyof FilterEntity
      // let newKey: Keys
      // newKey =  "value"
      
      // console.log(      option[newKey])
       return option.name.indexOf(filterValue) === 0
    }
    );
    return filterList;
  } 

  /**
   * Remove all selected elements
   */
  unselectAll(formControl: FormControl) {
    formControl.patchValue([]);
  }

  openedChange(e, formControl: { patchValue: (arg0: string) => void }) {
    // Set search textbox value as empty while opening selectbox
    formControl.patchValue('');
  }

  /**
   * Clearing search textbox value
   */
  clearSearch(event, searchControl) {
    event.stopPropagation();
    searchControl.patchValue('');
  }
}
