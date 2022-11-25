
export interface UrgentMarketMessagesInfrastructure<T>{
    name: string;
    endpoint: string;
    expanded: boolean;
    options: T[];
}

export interface FilterEntity  {
    name : string;
    code : string;
}

export interface EntityParams  {
    [key: string]: FilterEntity[];
}

export type FilterParams = {
    [key: string]: string[];
 }
