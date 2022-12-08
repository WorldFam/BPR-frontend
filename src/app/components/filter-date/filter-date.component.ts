import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DateFilter } from 'src/app/models/filter-infrastructure.model';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css'],
})
export class FilterDateComponent implements OnInit {
  ngOnInit(): void {
    this.dateControl = this.getFilterValue();
    this.dateControl.disable()
  }

  @Input()
  form: FormGroup;

  @Input()
  filter: DateFilter;

  dateControl = new FormControl();
  getFilterValue = () => this.form.get(this.filter.endpoint) as FormControl;

}
