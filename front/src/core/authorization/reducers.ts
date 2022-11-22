import { combineReducers } from "redux";
import { confirmSignUpSlice } from "./useCases/confirmSignUp";
import { currentUserSlice } from "./useCases/currentUser";
import { forgotPasswordSlice } from "./useCases/forgotPassword";
import { forgotPasswordSubmitSlice } from "./useCases/forgotPasswordSubmit";
import { isAlreadySignedInSlice } from "./useCases/isAlreadySignedIn";
import { signInSlice } from "./useCases/signIn";
import { signOutSlice } from "./useCases/signOut";
import { signUpSlice } from "./useCases/signUp";
export default combineReducers({
  currentUser: currentUserSlice.reducer,
  isAlreadySignedIn: isAlreadySignedInSlice.reducer,
  signIn: signInSlice.reducer,
  signUp: signUpSlice.reducer,
  confirmSignUp: confirmSignUpSlice.reducer,
  signOut: signOutSlice.reducer,
  forgotPassword: forgotPasswordSlice.reducer,
  forgotPasswordSubmit: forgotPasswordSubmitSlice.reducer,
});
