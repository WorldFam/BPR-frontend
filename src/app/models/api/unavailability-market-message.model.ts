  export interface IUnavailabilityMarketMessage {
    mRID: string
    Source: string
    RevisionNumber: number
    Country: string
    BiddingZone: string
    EventStatus: string
    TypeOfEvent: string
    TypeOfUnavailability: string
    AffectedAssetOrUnit: string
    Published: string
    EventStart: string
    EventEnd: string
    AvailableCapacity: number
    InstalledCapacity: number
    UnavailableCapacity: number
    UnitOfMeasure: string
    FuelType: string
  }
  