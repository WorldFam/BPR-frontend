import { Component, OnInit,  Input, } from '@angular/core';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css']
})
export class FilterDateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  name: string;

}
