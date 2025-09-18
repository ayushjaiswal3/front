import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../Auth";

const Privateroutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default Privateroutes;
