import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UmmEntries } from 'src/app/enums/umm-entries';
import { UMMTableColumn,UMMFilterOption, UMM } from 'src/app/models/model';
import { FilterComponent } from '../filter/filter.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { UrgentMarketMessagesService } from 'src/app/services/urgent-market-messages.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);
  dataSource = new MatTableDataSource();
  isLoadingResults = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private urgentMarketMessage: UrgentMarketMessagesService, private router: Router) {
   
  }

  private generateColumns(): UMMTableColumn[] {
    let columns: UMMTableColumn[] = [];
    Object.entries(UmmEntries).forEach(([key, value]) => {
      columns.push({
        key: key,
        header: value,
        sortable: true,
      });
    });
    return columns;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sourceList: string[] = ['source1', 'source2', 'source3']
  countryList: string[] = ['country1','country2','country3'];

  filterValues = {
    source : '',
    country : '' ,

  };
  
  @ViewChild('search') searchTextBox: ElementRef;

  sourceFormControl = new FormControl();
  countryFormControl = new FormControl();

  searchTextboxControl = new FormControl();
  searchTextboxControlCountry = new FormControl();

  filteredOptions: Observable<any[]>;
  filteredOptionsCountry: Observable<any[]>;

  ngOnInit(): void {
    this.loadUMMS();

    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name, this.sourceList))
    );

    this.filteredOptionsCountry = this.searchTextboxControlCountry.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name, this.countryList))
    );
      
      //will be assigned data from httpcall 
      this.sourceFormControl.valueChanges.subscribe(value => {
        this.filterValues.source = value
        // const params = new HttpParams({fromObject: this.filterValues});
        // if(this.filterValues.source.includes('source1')){
        //   params.append('source', value);
        // }
        this.urgentMarketMessage.getUMMS(this.filterValues).subscribe(data  => {
          this.dataSource.data = data;
        });
        // console.log(  this.filterValues.source)
        // this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.countryFormControl.valueChanges.subscribe(value => {
        this.filterValues.country = value;
        this.urgentMarketMessage.getUMMS(this.filterValues).subscribe(data  => {
          this.dataSource.data = data;
        });
        //this.dataSource.filter = JSON.stringify(this.filterValues);
      });
      
     
      this.dataSource.filterPredicate = this.createFilters();
  }

  private createFilters<T>(): (data: T, filter: string) => boolean {
    const filterFunction = function (data: T, filter: string): boolean {
      const searchTerms: Partial<Record<keyof T, string>> = JSON.parse(filter);
      if (searchTerms === null || searchTerms === undefined) {
        return true;
      }
  
      return Object.keys(searchTerms).every((key) => {
        if (Array.isArray(searchTerms[key])) {
          return searchTerms[key]?.length > 0
            ? searchTerms[key].every((term: string) =>
                Array.isArray(data[key])
                  ? data[key].includes(term)
                  : data[key] === term
              )
            : true;
        }
  
        return (
          data[key]?.toLowerCase()?.indexOf(searchTerms[key]?.toLowerCase()) !==
          -1
        );
      });
    };
  
    return filterFunction;
  }

  loadUMMS() {
    return this.urgentMarketMessage.getUMMS(this.filterValues).subscribe(data  => {
      this.dataSource.data = data;
    });

  }

  rowClick(umm: UMM) {
    return this.urgentMarketMessage.getUMM(umm.id).subscribe(data  => {
      console.log(data)
      // this.dataSource.data = data;
    });
  }
  
  private _filter(name: string, dataList: string[] ): String[] {
    const filterValue = name.toLowerCase();
    let filteredList = dataList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    return filteredList;
  }

/**
 * Remove all selected elements
 */
  unselectAll(formControl: FormControl) {
    formControl.patchValue([]);
  }

    openedChange(e,searchControl) {
      // Set search textbox value as empty while opening selectbox 
      searchControl.patchValue('');
    }
  
    /**
     * Clearing search textbox value 
     */
    clearSearch(event,searchControl) {
      event.stopPropagation();
      searchControl.patchValue('');
    }
  }

