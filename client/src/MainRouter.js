import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Home from "./cores/Home";
import Register from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import PrivateRoute from "./components/Auth/PRouter";
import AdminRoute from "./components/Auth/AdminRoutte";
import UserDashboard from "./components/USERS/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDash";
import Layouts from "./Layout";
import AddCategory from "./components/Admin/AddCategory";
import AddProduct from "./components/Admin/AddProduct";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import { Cart } from "./components/Cart/Cart";
import CheckOut from "./components/Cart/CheckOut";
export default class MainRouter extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Layouts></Layouts>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute
              exact
              path="/user/dashboard"
              component={UserDashboard}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/checkout"
              component={CheckOut}
            ></PrivateRoute>
            <Route exact path="/user/cart" component={Cart}></Route>
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/create/category"
              component={AddCategory}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/create/product"
              component={AddProduct}
            ></AdminRoute>
            <Route
              exact
              path="/product/:productId"
              component={SingleProduct}
            ></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}
