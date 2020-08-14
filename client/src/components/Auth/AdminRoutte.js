import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../operations/operations";
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        ></Redirect>
      )
    }
  ></Route>
);

export default AdminRoute;
