import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements  OnInit {

  @Input()
  options: string [];

  @Output() 
  selectedOptions = new EventEmitter<string>();

  filterControl = new FormControl();
  

  ngOnInit(): void {
      //will be assigned data from httpcall 
      this.filterControl.valueChanges.subscribe(value => {
        this.selectedOptions.emit(value)
      });
  }
  }

