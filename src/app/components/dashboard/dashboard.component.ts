import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { UMMEntries } from 'src/app/enums/enum';
import { UMMTableColumn,UMMFilterOption, UMM } from 'src/app/models/model';
import { FilterComponent } from '../filter/filter.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import UMMJSON from './UMM.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  columns = this.generateColumns();
  displayedColumns = this.columns.map((c) => c.key);
  dataSource = new MatTableDataSource<UMM>(UMMJSON);
  isLoadingResults = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient) {
    // this.http.get<Document[]>(this.url).subscribe(data => {
    //   this.items = data
    //   console.log(this.items)})
  }

  private generateColumns(): UMMTableColumn[] {
    let columns: UMMTableColumn[] = [];
    Object.entries(UMMEntries).forEach(([key, value]) => {
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


  sourceList: string[] = ['ut', 'Est cupiditate reiciendis aliquid quia rerum nisi consectetur quia libero.', 'Error nihil ducimus veritatis ab.'];
  countryList: string[] = ['autem','reprehenderit','debitis'];
  public filterValues = {
    source: "",
  };

  
  ummFilters: UMMFilterOption[]=[];
  filterDictionary= new Map<string,string>();

  ngOnInit(): void {
    // this.ummFilters.push({name:'source',options:this.sourceList});
    // this.ummFilters.push({name:'country',options:this.countryList});

    // this.dataSource.filterPredicate = (data, filter) => {
    //   var map = new Map(JSON.parse(filter));
    //   console.log(data)

    //   for(let [key,value] of map){
    //     let isMatch = (data[key as keyof UMM] == value); 
    //     if(!isMatch) return false;
    //   }
    //   return true;
    // }

    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name))
    );

      //will be assigned data from httpcall 
      this.selectFormControl.valueChanges.subscribe(value => {
        console.log(value + " SUBVALUE")
        this.filterValues.source = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.dataSource.filterPredicate = this.createFilters();
  }

  // applyUMMFilter(ob:MatSelectChange,ummfilter:UMMFilterOption) {
  //   this.filterDictionary.set(ummfilter.name,ob.value);
  //   var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
  //   this.dataSource.filter = jsonString;
  // }
  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];

  filteredOptions: Observable<any[]>;
  @ViewChild('allSelected') private allSelected: MatOption;


  private createFilters<T>(): (data: T, filter: string) => boolean {
    const filterFunction = function (data: T, filter: string): boolean {
      const searchTerms: Partial<Record<keyof T, string>> = JSON.parse(filter);
  
      if (searchTerms === null || searchTerms === undefined) {
        return true;
      }
  
      return Object.keys(searchTerms).every((key) => {
        if (Array.isArray(searchTerms[key])) {
          return searchTerms[key]?.length > 0
            ? searchTerms[key].some((term: string) =>
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
















  
  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.sourceList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    console.log(filteredList)
    return filteredList;
  }

/**
 * Remove from selected values based on uncheck
 */
  selectionChange(event) {
    if (event.isUserInput && event.source.selected == false) {
      let index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1)
    }  
  }

/**
 * Remove all selected elements
 */
  unselectAll() {
    this.selectFormControl.patchValue([]);
    this.selectedValues.splice(0);
  }

    openedChange(e) {
      // Set search textbox value as empty while opening selectbox 
      this.searchTextboxControl.patchValue('');
      // Focus to search textbox while clicking on selectbox
      if (e == true) {
        this.searchTextBox.nativeElement.focus();
      }
    }
  
    /**
     * Clearing search textbox value 
     */
    clearSearch(event) {
      event.stopPropagation();
      this.searchTextboxControl.patchValue('');
    }
  
    /**
     * Set selected values to retain the state 
     */
    setSelectedValues() {
      console.log('selectFormControl', this.selectFormControl.value);
      if (this.selectFormControl.value && this.selectFormControl.value.length > 0) {
        this.selectFormControl.value.forEach((e) => {
          if (this.selectedValues.indexOf(e) == -1) {
            this.selectedValues.push(e);
          }
        });
      }
    }
  }

