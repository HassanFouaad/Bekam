import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import { NavbarComponent } from "./cores/Navbar";
import Home from "./components/Home";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
export default class MainRouter extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <NavbarComponent></NavbarComponent>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}
