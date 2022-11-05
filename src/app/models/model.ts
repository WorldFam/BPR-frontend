import {UMMEntries} from '../enums/enum';

export interface UMMTableColumn {
    key: string;
    header: UMMEntries;
    sortable: boolean;
}

export interface UMMFilterOption{
    name:string;
    options:string[];
}

export interface UMM {
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