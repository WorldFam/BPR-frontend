import {
  OptionFilter,
  FilterParams,
  DateFilter
} from '../models/urgent-market-messages-infrastructure.model';
import { Infrastructure, InfrastructureEndpoint } from 'src/app/enums/umm-entries';

export const OptionFilters: OptionFilter<FilterParams>[] = [
  {
    name: Infrastructure.areas,
    endpoint: InfrastructureEndpoint.areas,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.assets,
    endpoint: InfrastructureEndpoint.assets,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.eventTypes,
    endpoint: InfrastructureEndpoint.eventTypes,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.fuelTypes,
    endpoint: InfrastructureEndpoint.fuelTypes,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.sources,
    endpoint: InfrastructureEndpoint.sources,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.status,
    endpoint: InfrastructureEndpoint.status,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.unavailabilityTypes,
    endpoint: InfrastructureEndpoint.unavailabilityTypes,
    expanded: false,
    options: [],
  }
];


export const DateFilters: DateFilter[] = [
  {
    name: Infrastructure.publicationDate,
    endpoint: InfrastructureEndpoint.publicationDate,
    rangePicker: false
  },
  {
    name: Infrastructure.eventDate,
    endpoint: InfrastructureEndpoint.eventDate,
    rangePicker: true
  }
];
