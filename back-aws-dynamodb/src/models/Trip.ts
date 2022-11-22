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
  body: {
    username: string;
    country: string;
    city: string;
    status: TripStatus;
    coordinates:[number,number];
    arrivalDate?:string;
    departureDate?:string;
  };
}

export interface UpdateTrip {
  body: {
    status: TripStatus;
    arrivalDate?:string;
    departureDate?:string;
  };
}
