import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Services } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";
import Trip, { CreateTrip } from "../domain/trip";

interface CreateTripState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: CreateTripState = {
  status: "NONE",
};

export const createTrip = createAsyncThunk(
  "trip/create/initial",
  async (data:CreateTrip, thunkAPI) => {
    const { tripBackend } = thunkAPI.extra as Services;
    const result = await tripBackend.createTrip(data);
    if (result) {
      thunkAPI.dispatch(createTripSlice.actions.tripCreated(result));
    }
  }
);

export const createTripSlice = createSlice({
  name: "trip/create",
  initialState,
  reducers: {
    resetCreateTrip: () => initialState,
    tripCreated: (state, action: PayloadAction<Trip>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(createTrip.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(createTrip.rejected, (state, action) => ({
        status: "ERROR",
        error: action.error.message as string,
      })),
});

export const statusSelector = (state: RootState) => state.trip.createTrip.status;
export const errorSelector = (state: RootState) => state.trip.createTrip.error;
export const { resetCreateTrip,tripCreated} = createTripSlice.actions;
export default createTripSlice.reducer;
