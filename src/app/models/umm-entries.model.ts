export interface UnavailabilityMarketMessageTableColumn<T> extends TableColumn {
  subcolumns?: T[];
}

export interface TableColumn {
    key: string;
    header: string;
    sortable: boolean;
}
