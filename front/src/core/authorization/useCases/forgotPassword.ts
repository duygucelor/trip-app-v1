import { Auth } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";

interface ForgotPasswordState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: ForgotPasswordState = {
  status: "NONE",
};

export const forgotPassword = createAsyncThunk(
  "authorization/forgotPassword/initial",
  async (email:string, thunkAPI) => {
   const response = await Auth.forgotPassword(email);
   return response;
  }
);

export const forgotPasswordSlice = createSlice({
  name: "authorization/forgotPassword",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(forgotPassword.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(forgotPassword.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error:"",
        };
      })
});

export const statusSelector = (state: RootState) => state.auth.forgotPassword.status;
export const errorSelector = (state: RootState) => state.auth.forgotPassword.error;
export const { reset } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
