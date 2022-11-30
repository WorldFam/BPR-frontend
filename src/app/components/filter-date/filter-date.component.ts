import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DateFilter } from 'src/app/models/urgent-market-messages-infrastructure.model';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css'],
})
export class FilterDateComponent implements OnInit {
  ngOnInit(): void {
    this.dateControl.disable();
    this.dateControl.setValue(
      this.setDate(
        this.localizeDate(this.filter.defaultStartDate),
        this.localizeDate(this.filter.defaultEndDate)
      )
    );
  }

  @Input()
  form: FormGroup;

  @Input()
  filter: DateFilter;

  separator = '-';
  dateControl = new FormControl();

  dateChanged(startDate: { value: string }, endDate: { value: string }) {
    this.dateControl.setValue(this.setDate(startDate.value, endDate.value));
  }

  setDate(startDate: string, endDate: string) {
    if (startDate === null && endDate === null) {
      return 'All';
    }

    else if (endDate === '') {
      return 'Today';
    }

    return startDate + this.separator + endDate;
  }

  localizeDate = (date: Date) => {
    if(date === null) return null;
    return date.toLocaleDateString();
  };
}
