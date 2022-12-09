import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, scan, startWith, tap } from 'rxjs/operators';
import { OptionFilter } from 'src/app/models/filter-infrastructure.model';
import { OptionFilterParams } from 'src/app/models/filter-params.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-filter-opt',
  templateUrl: './filter-opt.component.html',
  styleUrls: ['./filter-opt.component.css'],
})
export class FilterOptComponent implements OnInit {
  @Input()
  filter: OptionFilter<OptionFilterParams>;

  @Input()
  isLoadingOptions: boolean;

  filterControl = new FormControl();
  filteredValue: string;

  filteredOptions$: Observable<OptionFilterParams[]>;
  searchControl = new FormControl();

  @Input()
  form: FormGroup;

  total = 100;
  limit = 10;
  offset = 0;
  options = new BehaviorSubject<OptionFilterParams[]>([]);
  filteredList: OptionFilterParams[] = [];

  constructor() {}

  ngOnInit(): void {

    this.getNextBatch();
    this.filteredOptions$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );

    this.filterControl = this.getFilterValue();
    this.filterControl.valueChanges.subscribe((value: OptionFilterParams[]) => {
     
      if (value.length !== 0) {
        this.filteredValue = value[0].name;
      } else {
        this.filteredValue = '';
      }
    });
  }


  onSearchChange(searchValue: string): void {
    let filterList = this.filter.options.filter(
      (filter) =>
        filter.name.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
    );

    filterList.length
        ? this.options.next(filterList) 
        : this.options.next([{ name: 'No Item found', code: 'null' }]);
    }

  getNextBatch() {
      const result = this.filter.options.slice(
        this.offset,
        this.offset + this.limit
      );
      this.options.next(result);
      this.offset += this.limit;
    
  }

  getFilterValue = () => this.form.get(this.filter.endpoint) as FormControl;

  unselectAll(formControl: FormControl) {
    formControl.patchValue([]);
  }

  openedChange() {
    this.getNextBatch();
  }
}
