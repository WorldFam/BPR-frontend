import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OptionFilter } from 'src/app/models/filter-infrastructure.model';
import { OptionFilterParams } from 'src/app/models/filter-params.model';

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

  filteredOptions: Observable<OptionFilterParams[]>;
  searchControl = new FormControl();

  @Input()
  form: FormGroup;

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith<string>(''),
      map((name) => this._filter(name, this.filter))
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

  getFilterValue = () => this.form.get(this.filter.endpoint) as FormControl;

  private _filter<T>(
    name: string,
    infrastructure: OptionFilter<OptionFilterParams>
  ): OptionFilterParams[] {
    const filterValue = name.toUpperCase();
    let filterList = infrastructure.options.filter((option: any) => {
      return option.name.indexOf(filterValue) === 0;
    });
    return filterList;
  }

  unselectAll(formControl: FormControl) {
    formControl.patchValue([]);
  }

  openedChange(event, formControl: { patchValue: (arg0: string) => void }) {
    formControl.patchValue('');
  }

  clearSearch(event, searchControl) {
    event.stopPropagation();
    searchControl.patchValue('');
  }
}
