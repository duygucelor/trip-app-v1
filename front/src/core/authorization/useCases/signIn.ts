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

export const signIn = createAsyncThunk(
  "authorization/signIn/initial",
  async (data: { email: string; password: string }, thunkAPI) => {
   const response = await Auth.signIn(data.email, data.password);
   if(response){
      thunkAPI.dispatch(signInSlice.actions.signedIn(response));
   }
  }
);

export const signInSlice = createSlice({
  name: "authorization/signIn",
  initialState,
  reducers: {
    reset: () => initialState,
    signedIn: (state, action: PayloadAction<MyCognitoUser>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(signIn.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(signIn.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
});

export const statusSelector = (state: RootState) => state.auth.signIn.status;
export const errorSelector = (state: RootState) => state.auth.signIn.error;
export const { reset, signedIn } = signInSlice.actions;
export default signInSlice.reducer;
