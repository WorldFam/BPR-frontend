export interface Filter<T>{
    name: string;
    endpoint: string;
    isDateFilter : boolean
    expandedSearch?: boolean;
    options?: T[];
}
