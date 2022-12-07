  export interface IUnavailabilityMarketMessage {
    mRID: string
    source: string
    revisionNumber: number
    country: string
    biddingZone: string
    eventStatus: string
    typeOfEvent: string
    typeOfUnavailability: string
    affectedAssetOrUnit: string
    published: string
    eventStart: string
    eventEnd: string
    availableCapacity: number
    installedCapacity: number
    unavailableCapacity: number
    unitOfMeasure: string
    fuelType: string
    countryCode: string
  }
  