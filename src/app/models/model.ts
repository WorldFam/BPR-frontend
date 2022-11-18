import {UmmEntries, UmmEntriesHeaders} from '../enums/umm-entries';

export interface UMMTableColumn {
    key: string;
    header: UmmEntries| UmmEntriesHeaders;
    sortable: boolean;
}

export interface UMMFilterOption{
    name:string;
    options:string[];
}

export interface UMM {
    id: string;
    source: string;
    country: string;
    biddingZone: string;
    eventStatus: string;
    typeOfEvent: string;
    typeOfUnavailability: string;
    affectedAssetOrUnit: string;
    published: string;
    eventStart: string;
    eventEnd: string;
    availableCapacity: number;
    installedCapacity: number;
    unavailableCapacity: number;
    unitOfMeasure: string;
  }