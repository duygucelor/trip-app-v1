import { Auth } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";

interface ConfirmSignUpState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: ConfirmSignUpState = {
  status: "NONE",
};

export const confirmSignUp = createAsyncThunk(
  "authorization/confirmSignUp/initial",
  async (data: { email: string; code: string }, thunkAPI) => {
    const response = await Auth.confirmSignUp(data.email, data.code);
    return response;
  }
);

export const confirmSignUpSlice = createSlice({
  name: "authorization/confirmSignUp",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(confirmSignUp.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(confirmSignUp.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(confirmSignUp.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error: "",
        };
      }),
});

export const confirmStatusSelector = (state: RootState) =>
  state.auth.confirmSignUp.status;
export const confirmErrorSelector = (state: RootState) =>
  state.auth.confirmSignUp.error;
export const { reset } = confirmSignUpSlice.actions;
export default confirmSignUpSlice.reducer;
