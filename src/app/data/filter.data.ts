import {
  OptionFilter,
  DateFilter,
} from '../models/filter-infrastructure.model';
import { OptionFilterParams } from '../models/filter-params.model';
import {
  FilterInfrastructure,
  FilterInfrastructureQueryKeys,
} from 'src/app/enums/filter-infrastructure';

import { weekDaysNumber } from 'src/app/constants/constants';
export const OptionFilters: OptionFilter<OptionFilterParams>[] = [
  {
    name: FilterInfrastructure.assets,
    endpoint: FilterInfrastructureQueryKeys.assets,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.biddingZones,
    endpoint: FilterInfrastructureQueryKeys.biddingZones,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.countries,
    endpoint: FilterInfrastructureQueryKeys.countries,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.eventTypes,
    endpoint: FilterInfrastructureQueryKeys.eventTypes,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.fuelTypes,
    endpoint: FilterInfrastructureQueryKeys.fuelTypes,
    expanded: true,
    options: [],
  },
  {
    name: FilterInfrastructure.sources,
    endpoint: FilterInfrastructureQueryKeys.sources,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.status,
    endpoint: FilterInfrastructureQueryKeys.status,
    expanded: false,
    options: [],
  },
  {
    name: FilterInfrastructure.unavailabilityTypes,
    endpoint: FilterInfrastructureQueryKeys.unavailabilityTypes,
    expanded: false,
    options: [],
  },
];

export const DateFilters: DateFilter[] = [
  {
    name: FilterInfrastructure.publicationDate,
    endpoint: FilterInfrastructureQueryKeys.publicationDate,
    defaultStartDate: null,
    defaultEndDate: null,
  },
  {
    name: FilterInfrastructure.eventDate,
    endpoint: FilterInfrastructureQueryKeys.eventDate,
    defaultStartDate: new Date(),
    defaultEndDate: getNextWeekDate(),
  },
];

function getNextWeekDate() {
  let date = new Date();
  return new Date(date.setDate(date.getDate() + weekDaysNumber));
}
