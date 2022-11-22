import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import Trip from '../domain/trip';
import { tripCreated } from './createTrip';
import { tripsFetched } from './getUserTrips';

interface TripsState {
    trips: Trip[];
}

const initialState: TripsState = { trips: [] };

export const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        resetTrips: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(tripsFetched, (state, action) => {
                const trips = action.payload;
                state.trips = [];
                trips.map((trip) => state.trips.push(trip));
            })
            .addCase(tripCreated, (state, action) => {
                state.trips.push(action.payload);
            });
    },
});

export const tripsSelector = (state: RootState) => state.trip.trips.trips;
export const { resetTrips } = tripsSlice.actions;
export default tripsSlice.reducer;
