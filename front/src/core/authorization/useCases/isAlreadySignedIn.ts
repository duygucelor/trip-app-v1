import { Auth } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";
import { MyCognitoUser } from "../domain/auth";

interface SignInState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: SignInState = {
  status: "NONE",
};

export const isAlreadySignedIn = createAsyncThunk(
  "authorization/isAlreadySignedIn/initial",
  async (data, thunkAPI) => {
    const user: MyCognitoUser = await Auth.currentAuthenticatedUser();
    if (user) {
      thunkAPI.dispatch(isAlreadySignedInSlice.actions.alreadySignedIn(user));
    }
  }
);

export const isAlreadySignedInSlice = createSlice({
  name: "authorization/isAlreadySignedIn",
  initialState,
  reducers: {
    reset: () => initialState,
    alreadySignedIn: (state, action: PayloadAction<MyCognitoUser>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(isAlreadySignedIn.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(isAlreadySignedIn.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(isAlreadySignedIn.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error: "",
        };
      }),
});

export const statusSelector = (state: RootState) =>
  state.auth.isAlreadySignedIn.status;
export const errorSelector = (state: RootState) =>
  state.auth.isAlreadySignedIn.error;
export const { reset, alreadySignedIn } = isAlreadySignedInSlice.actions;
export default isAlreadySignedInSlice.reducer;
