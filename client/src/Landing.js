import React, { Component, Fragment } from "react";
import { isAuthenticated } from "./operations./operations";
import { DisplayProducts } from "./components/Products/DisplayProducts";
import "./Landing.css";
import { Jumbotron } from "reactstrap";
export default class Landing extends Component {
  componentDidMount() {
    document.title = "Bekam - Online Trade Handler";
  }
  render() {
    return (
      <Fragment>
        <Jumbotron id="jumbo"></Jumbotron>
        <div id="landing">
          <DisplayProducts></DisplayProducts>
        </div>
      </Fragment>
    );
  }
}
