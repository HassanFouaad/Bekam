import React, { Component, Fragment } from "react";
import { isAuthenticated } from "./operations./operations";
import { DisplayProducts } from "./components/Products/DisplayProducts";
import "./Landing.css";
import { Jumbotron, Container, Button, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";
export default class Landing extends Component {
  componentDidMount() {
    document.title = "Bekam - Online Trade Handler";
  }
  render() {
    return (
      <Fragment>
        <div id="landing">
          <Jumbotron id="jumbo">
            <Container>
              {!isAuthenticated() ? (
                <Fragment>
                  <div className="row">
                    <h1 id="catch" className="text-xl-left">
                      Catch Summer Discouts!
                    </h1>
                  </div>
                  <ButtonGroup className="row">
                    <Link to="/register">
                      <Button id="btns" className="">
                        Join
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button id="btns">Log in</Button>
                    </Link>
                  </ButtonGroup>
                </Fragment>
              ) : (
                <h2 id="h22">
                  <span>Welcome back😄, </span>
                  <span>{isAuthenticated().user.firstname}!</span>
                </h2>
              )}
              <div className="row">
                <Link to="/home">
                  <Button id="btns">Shop Now</Button>
                </Link>
              </div>
            </Container>
          </Jumbotron>
          <Container>
            <DisplayProducts></DisplayProducts>
          </Container>
        </div>
      </Fragment>
    );
  }
}
