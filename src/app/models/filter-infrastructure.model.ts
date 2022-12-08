interface Filter{
    name: string;
    endpoint: string;
}

export interface OptionFilter<T> extends Filter{
    expandedSearch: boolean;
    options: T[];
}

export interface DateFilter extends Filter{
    range: boolean
}
