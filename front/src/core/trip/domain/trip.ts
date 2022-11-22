
export enum TripStatus {
    alreadyVisited="alreadyVisited",
    wishToVisit = "wishToVisit",
    plannedTrip = "plannedTrip",
    lived="lived"
}
  export default interface Trip {
      id: string;
      username: string;
      country: string;
      city: string;
      status: TripStatus;
      coordinates:[number,number];
      arrivalDate?:string;
      departureDate?:string;
  }
  
  export interface CreateTrip {
        username: string;
        country: string;
        city: string;
        status: TripStatus;
        coordinates:[number,number];
        arrivalDate?:string;
        departureDate?:string;
    }
  
    export interface UpdateTrip {
        status: TripStatus;
        arrivalDate?:string;
        departureDate?:string;
    }

    export enum TripStatusLabel {
        alreadyVisited="I have already visited",
        wishToVisit = "I wish to visit there one day",
        plannedTrip = "I have a planned trip",
        lived="I lived there"
    }
    

    export function getTripStatusLabel(status?: string): string {
        return status ? TripStatusLabel[status as keyof typeof TripStatus] : '';
    }