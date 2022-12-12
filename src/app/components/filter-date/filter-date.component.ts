import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FaProps } from '@fortawesome/angular-fontawesome';
import { Filter } from 'src/app/models/filter-infrastructure.model';
import { FilterParams } from 'src/app/models/filter-params.model';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css'],
})
export class FilterDateComponent implements OnInit  {

  @Input()
  form: FormGroup;

  @Input()
  filter: Filter<FilterParams>;


  ngOnInit(): void {
    this.form.controls[this.filter.endpoint].disable();
  }

}
