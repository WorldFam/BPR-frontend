export interface FilterParams  {
    name : string;
    code : string;
}

export type QueryString = {
    [key: string]: string | string[];
}
