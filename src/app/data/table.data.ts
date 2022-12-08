import {
  UnavailabilityMarketMessageTableColumn,
  TableColumn,
} from '../models/umm-entries.model';
import { UnavailabilityMarketMessageColumnDef } from '../enums/umm-entries';

export const UnavailabilityMarketMessageTableColumns: UnavailabilityMarketMessageTableColumn<TableColumn>[] = [
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.source),
    header: UnavailabilityMarketMessageColumnDef.source,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.country),
    header: UnavailabilityMarketMessageColumnDef.country,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.biddingZone),
    header: UnavailabilityMarketMessageColumnDef.biddingZone,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.eventStatus),
    header: UnavailabilityMarketMessageColumnDef.eventStatus,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.typeOfEvent),
    header: UnavailabilityMarketMessageColumnDef.typeOfEvent,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.typeOfUnavailability),
    header: UnavailabilityMarketMessageColumnDef.typeOfUnavailability,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.affectedAssetOrUnit),
    header: UnavailabilityMarketMessageColumnDef.affectedAssetOrUnit,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.published),
    header: UnavailabilityMarketMessageColumnDef.published,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.eventStart),
    header: UnavailabilityMarketMessageColumnDef.eventStart,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.eventEnd),
    header: UnavailabilityMarketMessageColumnDef.eventEnd,
    sortable: true,
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.capacity),
    header: UnavailabilityMarketMessageColumnDef.capacity,
    sortable: false,
    subcolumns: [
      {
        key: getColumnKey(UnavailabilityMarketMessageColumnDef.availableCapacity),
        header: UnavailabilityMarketMessageColumnDef.availableCapacity,
        sortingkey: 'available',
        sortable: true,
      },
      {
        key: getColumnKey(UnavailabilityMarketMessageColumnDef.installedCapacity),
        header: UnavailabilityMarketMessageColumnDef.installedCapacity,
        sortingkey: 'installed',
        sortable: true,
      },
      {
        key: getColumnKey(UnavailabilityMarketMessageColumnDef.unavailableCapacity),
        header: UnavailabilityMarketMessageColumnDef.unavailableCapacity,
        sortingkey: 'unavailable',
        sortable: true,
      },
    ],
  },
  {
    key: getColumnKey(UnavailabilityMarketMessageColumnDef.unitOfMeasure),
    header: UnavailabilityMarketMessageColumnDef.unitOfMeasure,
    sortable: true,
  },
];

function getColumnKey(column: UnavailabilityMarketMessageColumnDef) {
  return Object.keys(UnavailabilityMarketMessageColumnDef)[
    Object.values(UnavailabilityMarketMessageColumnDef).indexOf(column)
  ];
}
