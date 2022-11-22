import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./core/authorization/reducers";
import tripReducer from "./core/trip/reducers";
import createAxiosClient from "./providers/axiosClient";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import TripBackend from "./providers/trip";
import { ITripBackend } from "./core/trip/domain/tripBackend";

export interface Services {
  readonly tripBackend: ITripBackend;
}

const backendUrl = process.env.REACT_APP_BACKEND_URL ?? "";
const axiosClient = createAxiosClient(backendUrl);
const services: Services = {
  tripBackend: new TripBackend(axiosClient)
};
export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: services,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
