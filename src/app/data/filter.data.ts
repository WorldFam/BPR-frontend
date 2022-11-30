import {
  OptionFilter,
  DateFilter,
} from '../models/filter-infrastructure.model';
import { OptionFilterParams } from '../models/filter-params.model';
import {
  FilterInfrastructure,
  FilterInfrastructureEndpoint,
} from 'src/app/enums/filter-infrastructure';

import { weekDaysNumber } from 'src/app/constants/constants';
export const OptionFilters: OptionFilter<OptionFilterParams>[] = [
  {
    name: FilterInfrastructure.areas,
    endpoint: FilterInfrastructureEndpoint.areas,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.assets,
    endpoint: FilterInfrastructureEndpoint.assets,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.eventTypes,
    endpoint: FilterInfrastructureEndpoint.eventTypes,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.fuelTypes,
    endpoint: FilterInfrastructureEndpoint.fuelTypes,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.sources,
    endpoint: FilterInfrastructureEndpoint.sources,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.status,
    endpoint: FilterInfrastructureEndpoint.status,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.unavailabilityTypes,
    endpoint: FilterInfrastructureEndpoint.unavailabilityTypes,
    expanded: false,
    options: [],
  },
];

export const DateFilters: DateFilter[] = [
  {
    name: FilterInfrastructure.publicationDate,
    endpoint: FilterInfrastructureEndpoint.publicationDate,
    defaultStartDate: null,
    defaultEndDate: null,
  },
  {
    name: FilterInfrastructure.eventDate,
    endpoint: FilterInfrastructureEndpoint.eventDate,
    defaultStartDate: new Date(),
    defaultEndDate: getNextWeekDate(),
  },
];

function getNextWeekDate() {
  let date = new Date();
  return new Date(date.setDate(date.getDate() + weekDaysNumber));
}
