import { lazy } from "react";

export enum PublicRoutesNames {
  sigIn = "signIn",
  signUp = "signUp",
  confirmSignUp = "confirmSignUp",
  forgotPassword = "forgotPassword",
  forgotPasswordSubmit = "forgotPasswordSubmit",
}

export enum PublicRoutesPaths {
  signIn = "/sign-in",
  signUp = "sign-up",
  confirmSignUp = "/confirm",
  forgotPassword = "/reset-password",
  forgotPasswordSubmit = "/submit-reset-password",
}

const publicRoutes = [
  {
    name: PublicRoutesNames.sigIn,
    path: PublicRoutesPaths.signIn,
    component: lazy(
      () => import("../pages/authorisation-pages/signIn/SignInPage")
    ),
    exact: true,
    protected: false,
  },
  {
    name: PublicRoutesNames.signUp,
    path: PublicRoutesPaths.signUp,
    component: lazy(
      () => import("../pages/authorisation-pages/signUp/SignUpPage")
    ),
    exact: true,
    protected: false,
  },
  {
    name: PublicRoutesNames.confirmSignUp,
    path: PublicRoutesPaths.confirmSignUp,
    component: lazy(
      () =>
        import("../pages/authorisation-pages/signUpConfirm/SignUpConfirmPage")
    ),
    exact: true,
    protected: false,
  },
  {
    name: PublicRoutesNames.forgotPassword,
    path: PublicRoutesPaths.forgotPassword,
    component: lazy(
      () =>
        import("../pages/authorisation-pages/forgotPassword/ForgotPasswordPage")
    ),
    exact: true,
    protected: false,
  },
  {
    name: PublicRoutesNames.forgotPasswordSubmit,
    path: PublicRoutesPaths.forgotPasswordSubmit,
    component: lazy(
      () =>
        import(
          "../pages/authorisation-pages/forgotPasswordSubmit/ForgotPasswordSubmitPage"
        )
    ),
    exact: true,
    protected: false,
  },
];

export default publicRoutes;
