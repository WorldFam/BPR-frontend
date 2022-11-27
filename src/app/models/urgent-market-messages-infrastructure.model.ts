
export interface Filter{
    name: string;
    endpoint: string;
}

export interface OptionFilter<T> extends Filter{
    expanded: boolean;
    options: T[];
}

export interface DateFilter extends Filter{
    rangePicker: boolean
}

export interface DateFilterParams  {
    start : Date;
    end : Date;
}

export interface FilterParams  {
    name : string;
    code : string;
}

export type QueryString = {
    [key: string]: string | string[];
 }
