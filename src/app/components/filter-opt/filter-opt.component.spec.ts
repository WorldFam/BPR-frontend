import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FilterInfrastructure,
  FilterInfrastructureQueryKeys,
} from 'src/app/models/enums/filter-infrastructure';
import { FilterOptComponent } from './filter-opt.component';

describe('FilterOptComponent', () => {
  let component: FilterOptComponent;
  let fixture: ComponentFixture<FilterOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterOptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOptComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({});
    (component.filter = {
      name: FilterInfrastructure.assets,
      endpoint: FilterInfrastructureQueryKeys.assets,
      expandedSearch: true,
      isDateFilter: false,
      options  : [
        { name: 'ENTSOE', code: 'S01' },
        { name: 'Hungarian RSS', code: 'S02' },
      ]
    }),
      component.form.addControl(
        component.filter.endpoint,
        new FormControl([], { nonNullable: true })
      );

    component.scanPosition();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the filteredOptions$ observable', () => {
    const options = [
      { name: 'Albania', code: 'Albania' },
      { name: 'Austria', code: 'Austria' },
      { name: 'Belgium', code: 'Belgium' },
      { name: 'Bulgaria', code: 'Bulgaria' },
    ];
    component.options.next(options); // Set the options for the class instance
    component.scanPosition(); // Call the scanPosition() method

    component.filteredOptions$.subscribe((filteredOptions) => {
      expect(filteredOptions).toEqual(options);
    });
  });

  it('should return the next batch of options', () => {
    const options = [
      { name: 'Albania', code: 'Albania' },
      { name: 'Austria', code: 'Austria' },
      { name: 'Bosnia & Herzegovina', code: 'Bosnia & Herzegovina' },
      { name: 'Belgium', code: 'Belgium' },
      { name: 'Bulgaria', code: 'Bulgaria' },
      { name: 'Belarus', code: 'Belarus' },
      { name: 'Switzerland', code: 'Switzerland' },
      { name: 'Czechia', code: 'Czechia' },
      { name: 'Germany', code: 'Germany' },
      { name: 'Denmark', code: 'Denmark' },
    ];
    component.filter.options = options;

    // Call the getNextBatch() method and verify that it returns the expected batch of options
    component.getNextBatch();
    component.filteredOptions$.subscribe((filteredOptions) => {
      expect(filteredOptions).toEqual(options.slice(0, 10));
    });

    // Call the getNextBatch() method again and verify that it returns the next batch of options
    component.getNextBatch();
    component.filteredOptions$.subscribe((filteredOptions) => {
      expect(filteredOptions).toEqual(options.slice(10, 20));
    });
    fixture.detectChanges();
  });

  it('should filter the options list when a search term is provided', () => {
    // Call the onSearchChange method with a search term
    component.onSearchChange('ENT');

    // Assert that the option in the filtered list has the expected name
    component.filteredOptions$.subscribe((filteredOptions) => {
      expect(filteredOptions).toEqual([{ name: 'ENTSOE', code: 'S01' }]);
    });
  });

  it('should return "No Item found" if no options match the search term', () => {
    component.onSearchChange('S01');
    component.filteredOptions$.subscribe((filteredOptions) => {
      expect(filteredOptions).toEqual([{ name: 'No Item found', code: 'null' }]);
    });
  });
});
