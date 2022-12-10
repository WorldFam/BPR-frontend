import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { scan } from 'rxjs/operators';
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

  @Input()
  form: FormGroup;

  filterControl = new FormControl();
  filteredValue: string;

  total = 100;
  limit = 10;
  offset = 0;
  filteredOptions$: Observable<FilterParams[]>;
  options = new BehaviorSubject<FilterParams[]>([]);

  ngOnInit(): void {
    this.scanPosition()

    this.filterControl = this.getFilterValue();
    this.filterControl.valueChanges.subscribe((value: FilterParams[]) => {
      if (value.length !== 0) {
        this.filteredValue = value[0].name;
      } else {
        this.filteredValue = '';
      }
    });
  }

  onSearchChange(searchTerm: string): void {
    if (searchTerm) {
      const filteredList = this.filter.options.filter(
        (filter) =>
          filter.name.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0
      );
      const filteredOptions = filteredList.length
        ? filteredList
        : [{ name: 'No Item found', code: 'null' }];

      this.filteredOptions$ = of(filteredOptions);
    } else {
      this.offset = 0;
      this.getNextBatch() 
      this.scanPosition()
    }
  }

  scanPosition(){
    this.filteredOptions$ = this.options.pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );
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
