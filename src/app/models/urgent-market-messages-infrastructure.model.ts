
export interface UrgentMarketMessagesInfrastructure<T>{
    name: string;
    endpoint: string;
    options: FilterEntity[];
}

// export type FilterEntries = {
//    [key: string]: string;
// }


export interface FilterEntity  {
    name : string;
    code : string;
}
