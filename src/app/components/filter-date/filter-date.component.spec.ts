import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FilterInfrastructure,
  FilterInfrastructureQueryKeys,
} from 'src/app/models/enums/filter-infrastructure';
import { FilterParams } from 'src/app/models/api/filter-params.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Filter } from 'src/app/models/dashboard/filter-infrastructure.model';

import { FilterDateComponent } from './filter-date.component';

describe('FilterDateComponent', () => {
  let component: FilterDateComponent;
  let fixture: ComponentFixture<FilterDateComponent>;
  let filter : Filter<FilterParams>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDateComponent, HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDateComponent);
    component = fixture.componentInstance;
    filter = component.filter = {
      name: FilterInfrastructure.publicationDate,
      endpoint: FilterInfrastructureQueryKeys.publicationDate,
      isDateFilter: true,
    };
    component.form = new FormGroup({});
    component.form.addControl(
      filter.endpoint,
      new FormControl([], { nonNullable: true })
    );
    
    fixture.detectChanges();
  });


});
