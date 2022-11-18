import {
  UrgentMarketMessagesInfrastructure,
  FilterEntity,
} from '../models/urgent-market-messages-infrastructure.model';
import { Infrastructure } from 'src/app/enums/umm-entries';

export const FILTEROPT: UrgentMarketMessagesInfrastructure<FilterEntity>[] = [
  {
    name: Infrastructure.areas,
    endpoint: Infrastructure.areas,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.assets,
    endpoint: Infrastructure.assets,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.eventTypes,
    endpoint: Infrastructure.eventTypes,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.fuelTypes,
    endpoint: Infrastructure.fuelTypes,
    expanded: true,
    options: [],
  },
  {
    name: Infrastructure.sources,
    endpoint: Infrastructure.sources,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.status,
    endpoint: Infrastructure.status,
    expanded: false,
    options: [],
  },
  {
    name: Infrastructure.unavailabilityTypes,
    endpoint: Infrastructure.unavailabilityTypes,
    expanded: false,
    options: [],
  },
];
