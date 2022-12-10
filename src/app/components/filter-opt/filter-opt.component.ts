import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {  debounceTime, map, scan, startWith, switchMap, } from 'rxjs/operators';
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

  pageSize = 10;
  pageIndex = 0;
  searchTerm = '';

  ngOnInit(): void {

    // this.filteredOptions$ = this.searchControl.valueChanges.pipe( 
    //   debounceTime(300),
    //   switchMap(searchTerm => {
    //     // Filter the options based on the search term
    //     const options = this.filter.options.filter(option => option.name.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0);
    //     // Emit the filtered options
    //     this.options.next(options);
    //     // Return an observable that emits the filtered options
    //     return of(options);
    //   }),
    //   scan((acc, curr) => [...acc, ...curr], [])

    // );

    this.getNextBatch();
    this.filteredOptions$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, []),
      // map(options => {
      //   return options.filter(option => 
      //     option.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) === 0);
      // })

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
  // @ViewChild('matSelect', { static: false }) matSelect: MatSelect;

  // ngAfterViewInit() {
  //   this.matSelect.panel.nativeElement.addEventListener('scroll', () => {
  //     // Check if the user has scrolled to the bottom of the options
  //     const scrollTop = this.matSelect.panel.nativeElement.scrollTop;
  //     const scrollHeight = this.matSelect.panel.nativeElement.scrollHeight;
  //     const panelHeight = this.matSelect.panel.nativeElement.offsetHeight;
  
  //     if (scrollTop + panelHeight >= scrollHeight) {
  //       // Load the next page of options
  //       this.getNextBatch()
  //     }
  //   });
  // }



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

