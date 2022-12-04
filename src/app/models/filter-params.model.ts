export interface DateFilterParams  {
    start : Date;
    end : Date;
}

export interface OptionFilterParams  {
    name : string;
    code : string;
}

export type QueryString = {
    [key: string]: string | string[];
}
