import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { MyCognitoUser } from "../domain/auth";
import { alreadySignedIn } from "./isAlreadySignedIn";
import { signedIn } from "./signIn";
import { signedOut } from "./signOut";

export interface CurrentUserState {
  currentUser?: MyCognitoUser;
}

const initialState: CurrentUserState = {};

export const currentUserSlice = createSlice({
  name: "authorization/currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signedIn, (state, action) => {
        state.currentUser = action.payload;
        // setJwt(state.currentUser.signInUserSession.idToken.jwtToken )
      })
      .addCase(signedOut, (state) => {
        state.currentUser = undefined;
      })
      .addCase(alreadySignedIn, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const currentUserSelector = (state: RootState) =>
  state.auth.currentUser.currentUser;
export const isSignedInSelector = (state: RootState) =>
  state.auth.currentUser.currentUser !== undefined;

export default currentUserSlice.reducer;
