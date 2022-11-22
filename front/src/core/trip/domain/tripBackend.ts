import Trip, {CreateTrip } from "./trip";


export interface ITripBackend {
    getUserTrips(username:string): Promise<Trip[]>;
    createTrip(data: CreateTrip): Promise<Trip>
}
