import {
  UrgentMarketMessageTableColumn,
  TableColumn,
} from '../models/umm-entries.model';
import { UrgentMarketMessageEntry } from '../enums/umm-entries';

export const UrgentMarketMessageTableColumns: UrgentMarketMessageTableColumn<TableColumn>[] = [
  {
    key: getColumnKey(UrgentMarketMessageEntry.source),
    header: UrgentMarketMessageEntry.source,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.country),
    header: UrgentMarketMessageEntry.country,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.biddingZone),
    header: UrgentMarketMessageEntry.biddingZone,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.eventStatus),
    header: UrgentMarketMessageEntry.eventStatus,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.typeOfEvent),
    header: UrgentMarketMessageEntry.typeOfEvent,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.typeOfUnavailability),
    header: UrgentMarketMessageEntry.typeOfUnavailability,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.affectedAssetOrUnit),
    header: UrgentMarketMessageEntry.affectedAssetOrUnit,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.published),
    header: UrgentMarketMessageEntry.published,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.eventStart),
    header: UrgentMarketMessageEntry.eventStart,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.eventEnd),
    header: UrgentMarketMessageEntry.eventEnd,
    sortable: true,
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.capacity),
    header: UrgentMarketMessageEntry.capacity,
    sortable: false,
    subcolumns: [
      {
        key: getColumnKey(UrgentMarketMessageEntry.available),
        header: UrgentMarketMessageEntry.available,
        sortable: true,
      },
      {
        key: getColumnKey(UrgentMarketMessageEntry.installed),
        header: UrgentMarketMessageEntry.installed,
        sortable: true,
      },
      {
        key: getColumnKey(UrgentMarketMessageEntry.unavailable),
        header: UrgentMarketMessageEntry.unavailable,
        sortable: true,
      },
    ],
  },
  {
    key: getColumnKey(UrgentMarketMessageEntry.unitOfMeasure),
    header: UrgentMarketMessageEntry.unitOfMeasure,
    sortable: true,
  },
];

function getColumnKey(column: UrgentMarketMessageEntry) {
  return Object.keys(UrgentMarketMessageEntry)[
    Object.values(UrgentMarketMessageEntry).indexOf(column)
  ];
}
