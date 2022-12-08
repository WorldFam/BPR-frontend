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
    expandedSearch: true,
    options: [],
  },
  {
    name: FilterInfrastructure.biddingZones,
    endpoint: FilterInfrastructureQueryKeys.biddingZones,
    expandedSearch: true,
    options: [],
  },
  {
    name: FilterInfrastructure.countries,
    endpoint: FilterInfrastructureQueryKeys.countries,
    expandedSearch: true,
    options: [],
  },
  {
    name: FilterInfrastructure.eventTypes,
    endpoint: FilterInfrastructureQueryKeys.eventTypes,
    expandedSearch: false,
    options: [],
  },
  {
    name: FilterInfrastructure.fuelTypes,
    endpoint: FilterInfrastructureQueryKeys.fuelTypes,
    expandedSearch: true,
    options: [],
  },
  {
    name: FilterInfrastructure.sources,
    endpoint: FilterInfrastructureQueryKeys.sources,
    expandedSearch: false,
    options: [],
  },
  {
    name: FilterInfrastructure.status,
    endpoint: FilterInfrastructureQueryKeys.status,
    expandedSearch: false,
    options: [],
  },
  {
    name: FilterInfrastructure.unavailabilityTypes,
    endpoint: FilterInfrastructureQueryKeys.unavailabilityTypes,
    expandedSearch: false,
    options: [],
  },
];

export const DateFilters: DateFilter[] = [
  {
    name: FilterInfrastructure.publicationDate,
    endpoint: FilterInfrastructureQueryKeys.publicationDate,
    range: false
  }
];
