import {
  Filter,
} from '../models/dashboard/filter-infrastructure.model';
import { FilterParams } from '../models/api/filter-params.model';
import {
  FilterInfrastructure,
  FilterInfrastructureQueryKeys,
} from 'src/app/models/enums/filter-infrastructure';
export const FiltersInfrastructure: Filter<FilterParams>[] = [
  {
    name: FilterInfrastructure.publicationDate,
    endpoint: FilterInfrastructureQueryKeys.publicationDate,
    isDateFilter: true,
  },
  {
    name: FilterInfrastructure.assets,
    endpoint: FilterInfrastructureQueryKeys.assets,
    expandedSearch: true,
    isDateFilter: false,
    options: [],
  },
  {
    name: FilterInfrastructure.biddingZones,
    endpoint: FilterInfrastructureQueryKeys.biddingZones,
    expandedSearch: true,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.countries,
    endpoint: FilterInfrastructureQueryKeys.countries,
    expandedSearch: true,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.eventTypes,
    endpoint: FilterInfrastructureQueryKeys.eventTypes,
    expandedSearch: false,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.fuelTypes,
    endpoint: FilterInfrastructureQueryKeys.fuelTypes,
    expandedSearch: true,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.sources,
    endpoint: FilterInfrastructureQueryKeys.sources,
    expandedSearch: false,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.status,
    endpoint: FilterInfrastructureQueryKeys.status,
    expandedSearch: false,
    isDateFilter: false,

    options: [],
  },
  {
    name: FilterInfrastructure.unavailabilityTypes,
    endpoint: FilterInfrastructureQueryKeys.unavailabilityTypes,
    expandedSearch: false,
    isDateFilter: false,
    options: [],
  },
];

