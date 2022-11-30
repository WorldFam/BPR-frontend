export interface Filter{
    name: string;
    endpoint: string;
}

export interface OptionFilter<T> extends Filter{
    expanded: boolean;
    options: T[];
}

export interface DateFilter extends Filter{
    defaultStartDate :  Date
    defaultEndDate: Date
}
