export interface UnavailabilityMarketMessageTableColumn<T> extends TableColumn {
  subcolumns?: T[];
}

export interface TableColumn {
    key: string;
    header: string;
    sortable: boolean;
}

// export interface UrgentMarketMessage {
//     id: string;
//     source: string;
//     country: string;
//     biddingZone: string;
//     eventStatus: string;
//     typeOfEvent: string;
//     typeOfUnavailability: string;
//     affectedAssetOrUnit: string;
//     published: string;
//     eventStart: string;
//     eventEnd: string;
//     availableCapacity: number;
//     installedCapacity: number;
//     unavailableCapacity: number;
//     unitOfMeasure: string;
//   }