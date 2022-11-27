import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InfrastructureEndpoint } from 'src/app/enums/umm-entries';
import { DateFilter } from 'src/app/models/urgent-market-messages-infrastructure.model';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css'],
})
export class FilterDateComponent implements OnInit {
  ngOnInit(): void {}

  @Input()
  form: FormGroup;

  @Input()
  filter: DateFilter;

  separator = '-';

  dateChanged(startDate, endDate) {
    if (!endDate.value) {
      endDate.value = startDate.value;
      this.form.setValue({ end: startDate.value });
    }

    if (this.filter.endpoint === InfrastructureEndpoint.publicationDate) {
      if (!endDate.value) {
        this.separator = '';
      } else {
        this.separator = '-';
      }
    }
  }
}
