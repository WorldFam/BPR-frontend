import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {  scan, } from 'rxjs/operators';
import { Filter } from 'src/app/models/filter-infrastructure.model';
import { FilterParams } from 'src/app/models/filter-params.model';

@Component({
  selector: 'app-filter-opt',
  templateUrl: './filter-opt.component.html',
  styleUrls: ['./filter-opt.component.css'],
})
export class FilterOptComponent implements OnInit {
  @Input()
  filter: Filter<FilterParams>;

  @Input()
  isLoadingOptions: boolean;

  filterControl = new FormControl();
  filteredValue: string;

  filteredOptions$: Observable<FilterParams[]>;
  searchControl = new FormControl();

  @Input()
  form: FormGroup;

  total = 100;
  limit = 10;
  offset = 0;
  options = new BehaviorSubject<FilterParams[]>([]);
  filteredList: FilterParams[] = [];

  ngOnInit(): void {

    this.getNextBatch();
    this.filteredOptions$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );

    this.filterControl = this.getFilterValue();
    this.filterControl.valueChanges.subscribe((value: FilterParams[]) => {
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
