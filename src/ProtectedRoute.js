import React from "react";
import { Redirect, Route } from "react-router-dom";
import DefaultLayout from './components/DefaultLayout';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticateUser");
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <DefaultLayout {...props} /> : <Redirect to="/Login" />
      }
    />
  );
}

export default ProtectedRoute;