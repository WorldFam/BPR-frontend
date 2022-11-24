import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity
} from 'src/app/models/urgent-market-messages-infrastructure.model';
import { __values } from 'tslib';

@Component({
  selector: 'app-filter-opt',
  templateUrl: './filter-opt.component.html',
  styleUrls: ['./filter-opt.component.css'],
})
export class FilterOptComponent implements OnInit {
  @Input()
  filter: UrgentMarketMessagesInfrastructure<FilterEntity>;

  @Input()
  isLoadingOptions: boolean;
 
  filterControl = new FormControl();
  filteredValue: string;

  // @Output()
  // selectedOptions = new EventEmitter<FormGroup>();

  filteredOptions: Observable<FilterEntity[]>;
  searchControl = new FormControl();

  @Input()
  form: FormGroup

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith<string>(''),
      map((name) => this._filter(name, this.filter))
    );
   
    this.filterControl = this.getFilterValue();
    
    //will be assigned data from httpcall
    this.filterControl.valueChanges.subscribe((value : FilterEntity[]) => {

      console.log(value)
      if(value.length !== 0){
      this.filteredValue = value[0].name
      }else {
        this.filteredValue = '';
      }

      // if(value.length === this.options.options.length){
      //   this.filteredValue = "All " + this.options.name;
      // }
      
      // let filtered = {key: this.filter.endpoint, values: value.map(value => value.code)}
      // this.selectedOptions.emit(this.form.value);


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

  getFilterValue = () => this.form.get(this.filter.endpoint) as FormControl;

  private _filter<T>(
    name: string,
    infrastructure: UrgentMarketMessagesInfrastructure<FilterEntity>
  ): FilterEntity[] {
    const filterValue = name.toUpperCase();
    let filterList = infrastructure.options.filter((option: any) => {
      // type Keys = keyof FilterEntity
      // let newKey: Keys
      // newKey =  "value"

      return option.name.indexOf(filterValue) === 0;
    });
    return filterList;
  }

  /**
   * Remove all selected elements
   */
  unselectAll(formControl: FormControl) {
    formControl.patchValue([]);
  }

  openedChange(event, formControl: { patchValue: (arg0: string) => void }) {
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
