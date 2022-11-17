import { UrgentMarketMessagesInfrastructure, FilterEntity } from '../models/urgent-market-messages-infrastructure.model';
import { Infrastructure } from 'src/app/enums/umm-entries'

export const FILTEROPT : UrgentMarketMessagesInfrastructure<FilterEntity>[]  = [
    {
        name: Infrastructure.areas,
        endpoint: Infrastructure.areas,
        options: []
    },
    {
        name: Infrastructure.assets,
        endpoint: Infrastructure.assets,
        options: []
    },
    {
        name: Infrastructure.eventTypes,
        endpoint: Infrastructure.eventTypes,
        options: []
    },
    {
        name: Infrastructure.fuelTypes,
        endpoint: Infrastructure.fuelTypes,
        options: []
    },
    {
        name: Infrastructure.sources,
        endpoint: Infrastructure.sources,
        options: []
    },
    {
        name: Infrastructure.status,
        endpoint: Infrastructure.status,
        options: []
    },
    {
        name: Infrastructure.unavailabilityTypes,
        endpoint: Infrastructure.unavailabilityTypes,
        options: []
    },
]