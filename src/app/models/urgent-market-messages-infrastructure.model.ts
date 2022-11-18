
export interface UrgentMarketMessagesInfrastructure<T>{
    name: string;
    endpoint: string;
    expanded: boolean;
    options: FilterEntity[];
}

// export type FilterEntries = {
//    [key: string]: string;
// }


export interface FilterEntity  {
    name : string;
    code : string;
}
