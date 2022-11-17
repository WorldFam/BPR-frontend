import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptComponent } from './filter-opt.component';

describe('FilterOptComponent', () => {
  let component: FilterOptComponent;
  let fixture: ComponentFixture<FilterOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterOptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
