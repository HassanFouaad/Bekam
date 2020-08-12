import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../operations./operations";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        ></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
