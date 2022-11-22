import { combineReducers } from "redux";
import { createTripSlice } from "./useCases/createTrip";
import { getUserTripsSlice } from "./useCases/getUserTrips";
import { tripsSlice } from "./useCases/trips";

export default combineReducers({
  getUserTrips: getUserTripsSlice.reducer,
  createTrip: createTripSlice.reducer,
  trips: tripsSlice.reducer,
});
