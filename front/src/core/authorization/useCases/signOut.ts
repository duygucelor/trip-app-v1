import { Auth } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";

interface SignIOutState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: SignIOutState = {
  status: "NONE",
};

export const signOut = createAsyncThunk(
  "authorization/signOut/initial",
  async (data,thunkAPI) => {
   const response = await Auth.signOut();
    thunkAPI.dispatch(signOutSlice.actions.signedOut(response));
    return response
  }
);

export const signOutSlice = createSlice({
  name: "authorization/signOut",
  initialState,
  reducers: {
    reset: () => initialState,
    signedOut: (state, action: PayloadAction<any>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(signOut.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(signOut.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(signOut.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error:"",
        };
      })
});

export const statusSelector = (state: RootState) => state.auth.signOut.status;
export const errorSelector = (state: RootState) => state.auth.signOut.error;
export const { reset, signedOut } = signOutSlice.actions;
export default signOutSlice.reducer;
