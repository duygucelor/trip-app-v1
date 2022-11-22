import { Auth, CognitoUser } from "@aws-amplify/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { BackendRequestStatus } from "../../backend_status";

interface SignUpState {
  status: BackendRequestStatus;
  error?: string;
}

const initialState: SignUpState = {
  status: "NONE",
};

export const signUp = createAsyncThunk(
  "authorization/signUp/initial",
  async (
    data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    thunkAPI
  ) => {
    const { email, password, firstName, lastName } = data;
     await Auth.signUp({
      username: email,
      password,
      attributes: { given_name: firstName, family_name: lastName },
    })
  }
);

export const signUpSlice = createSlice({
  name: "authorization/signUp",
  initialState,
  reducers: {
    reset: () => initialState,
    signedUp: (state, action: PayloadAction<CognitoUser>) => ({
      status: "SUCCESS",
      error: undefined,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.pending, () => ({
        status: "PENDING",
        error: undefined,
      }))
      .addCase(signUp.rejected, (state, action) => {
        return {
          status: "ERROR",
          error: action.error.message as string,
        };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        return {
          status: "SUCCESS",
          error:"",
        };
      }),
});

export const statusSelector = (state: RootState) => state.auth.signUp.status;
export const errorSelector = (state: RootState) => state.auth.signUp.error;
export const { reset, signedUp } = signUpSlice.actions;
export default signUpSlice.reducer;
