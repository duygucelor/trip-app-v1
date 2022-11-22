import { Auth } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";

interface ForgotPasswordSubmitState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: ForgotPasswordSubmitState = {
  status: "NONE",
};

export const forgotPasswordSubmit = createAsyncThunk(
  "authorization/forgotPasswordSubmit/initial",
  async (data: { email: string; code: string; password: string }, thunkAPI) => {
    const response = await Auth.forgotPasswordSubmit(
      data.email,
      data.code,
      data.password
    );
    return response;
  }
);

export const forgotPasswordSubmitSlice = createSlice({
  name: "authorization/forgotPasswordSubmit",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(forgotPasswordSubmit.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(forgotPasswordSubmit.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(forgotPasswordSubmit.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error: "",
        };
      }),
});

export const statusSelector = (state: RootState) =>
  state.auth.forgotPasswordSubmit.status;
export const errorSelector = (state: RootState) =>
  state.auth.forgotPasswordSubmit.error;
export const { reset } = forgotPasswordSubmitSlice.actions;
export default forgotPasswordSubmitSlice.reducer;
