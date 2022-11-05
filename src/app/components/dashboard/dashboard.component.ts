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


  sourceList: string[] = ['All','ut', 'Est cupiditate reiciendis aliquid quia rerum nisi consectetur quia libero.', 'Error nihil ducimus veritatis ab.'];
  ummFilters: UMMFilterOption[]=[];
  defaultValue = "All";
  filterDictionary= new Map<string,string>();

  ngOnInit(): void {
    this.ummFilters.push({name:'source',options:this.sourceList,defaultValue:this.defaultValue});
    
    this.dataSource.filterPredicate = (data, filter) => {
      let displayData = true;
      let myFilter = JSON.parse(filter); 

      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (data[key as keyof UMM] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    }

    this.filteredOptions = this.searchTextboxControl.valueChanges
    .pipe(
      startWith<string>(''),
      map(name => this._filter(name))
    );
  }

  applyUMMFilter(ob:MatSelectChange,ummfilter:UMMFilterOption) {
    this.filterDictionary.set(ummfilter.name,ob.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
  }

  @ViewChild('search') searchTextBox: ElementRef;

  selectFormControl = new FormControl();
  searchTextboxControl = new FormControl();
  selectedValues = [];
  icon = null;
  data: string[] = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'B3',
    'C1',
    'C2',
    'C3'
  ]

  filteredOptions: Observable<any[]>;
  @ViewChild('allSelected') private allSelected: MatOption;

  private _filter(name: string): String[] {
    const filterValue = name.toLowerCase();
    // Set selected values to retain the selected checkbox state 
    this.setSelectedValues();
    this.selectFormControl.patchValue(this.selectedValues);
    let filteredList = this.data.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
    this.selectFormControl.patchValue(this.selectedValues.splice(0));
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

