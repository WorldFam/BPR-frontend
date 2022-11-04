import {UMMEntries} from '../enums/enum';

export interface UMMTableColumn {
    key: string;
    header: UMMEntries;
    sortable: boolean;
}
  