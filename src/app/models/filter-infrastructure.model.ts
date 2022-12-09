export interface Filter<T>{
    name: string;
    endpoint: string;
    isDateFilter : boolean
    defaultValue?: any
    expandedSearch?: boolean;
    options?: T[];
}
