import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { isSignedInSelector } from "../../core/authorization/useCases/currentUser";
import {
  isAlreadySignedIn,
  reset,
} from "../../core/authorization/useCases/isAlreadySignedIn";
import Navbar from "../globalComponents/navbar/AppBar";
import privateRoutes, { PrivateRoutesPaths } from "./privateRoutes";
import publicRoutes, { PublicRoutesPaths } from "./publicRoutes";
import { Box } from "@mui/material";

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(isSignedInSelector);
  const [canRender, setcanRender] = useState(false);
  useEffect(() => {
    dispatch(isAlreadySignedIn()).then(() => {
      setcanRender(true);
      dispatch(reset());
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      {canRender && (
        <Suspense fallback={null}>
          <Routes>
            {publicRoutes.map(({ component: Component, path, name }) => (
              <Route
                key={name}
                path={path}
                element={
                  isSignedIn ? (
                    <Navigate to={PrivateRoutesPaths.home} />
                  ) : (
                    <Component />
                  )
                }
              ></Route>
            ))}
            {privateRoutes.map(({ component: Component, path, name }) => (
              <Route
                key={name}
                path={path}
                element={
                  isSignedIn ? (
                    <Box sx={{ overflow: "hidden", maxHeight: "100vh" }}>
                      <Navbar />
                      <Component />
                    </Box>
                  ) : (
                    <Navigate to={PublicRoutesPaths.signIn} />
                  )
                }
              ></Route>
            ))}
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
};
