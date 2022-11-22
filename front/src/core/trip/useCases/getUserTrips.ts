import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Services } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";
import Trip from "../domain/trip";


interface GetUserTripsState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: GetUserTripsState = {
  status: "NONE",
};

export const getUserTrips = createAsyncThunk(
  "trip/getUserTrips/initial",
  async (data:string, thunkAPI) => {
    const { tripBackend } = thunkAPI.extra as Services;
    const result = await tripBackend.getUserTrips(data);
    if (result) {
      thunkAPI.dispatch(getUserTripsSlice.actions.tripsFetched(result));
    }
  }
);

export const getUserTripsSlice = createSlice({
  name: "trip/getUserTrips",
  initialState,
  reducers: {
    reset: () => initialState,
    tripsFetched: (state, action: PayloadAction<Trip[]>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserTrips.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(getUserTrips.rejected, (state, action) => ({
        status: "ERROR",
        error: action.error.message as string,
      })),
});

export const statusSelector = (state: RootState) => state.trip.getUserTrips.status;
export const errorSelector = (state: RootState) => state.trip.getUserTrips.error;
export const { reset, tripsFetched} = getUserTripsSlice.actions;
export default getUserTripsSlice.reducer;
