import { lazy } from "react";

export enum PrivateRoutesNames {
  home = "home",
  myTrips = "myTrips",
  addTrip = "addTrip",
}

export enum PrivateRoutesPaths {
  home = "/",
  myTrips = "my-trips",
  addTrip = "add-trip",
}

const privateRoutes = [
  {
    name: PrivateRoutesNames.home,
    path: PrivateRoutesPaths.home,
    component: lazy(() => import("../pages/home/Home")),
    exact: true,
    protected: true,
  },
  {
    name: PrivateRoutesNames.addTrip,
    path: PrivateRoutesPaths.addTrip,
    component: lazy(() => import("../pages/addTrip/AddTrip")),
    exact: true,
    protected: true,
  },
  {
    name: PrivateRoutesNames.myTrips,
    path: PrivateRoutesPaths.myTrips,
    component: lazy(() => import("../pages/myTrips/myTrips")),
    exact: true,
    protected: true,
  },
];

export default privateRoutes;
