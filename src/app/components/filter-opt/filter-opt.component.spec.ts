import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterInfrastructure, FilterInfrastructureQueryKeys } from 'src/app/models/enums/filter-infrastructure';
import { Filter } from 'src/app/models/dashboard/filter-infrastructure.model';

import { FilterOptComponent } from './filter-opt.component';
import { FilterParams } from 'src/app/models/api/filter-params.model';

describe('FilterOptComponent', () => {
  let component: FilterOptComponent;
  let fixture: ComponentFixture<FilterOptComponent>;
  let filter : Filter<FilterParams>;
  let form : FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterOptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptComponent);
    component = fixture.componentInstance;

    form = component.form = new FormGroup({})
    filter = component.filter = {
      name: FilterInfrastructure.assets,
      endpoint: FilterInfrastructureQueryKeys.assets,
      expandedSearch: true,
      isDateFilter: false,
      options: [],
    },
    component.form.addControl(
      filter.endpoint,
      new FormControl([], { nonNullable: true })
    );
    component.filterControl = form.controls[filter.endpoint] as FormControl
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
