import React, { Component, Fragment } from "react";
import { isAuthenticated } from "./operations/operations";
import { DisplayProducts } from "./components/Products/DisplayProducts";
import "./Landing.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Jumbotron, Container, Button, ButtonGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Search } from "./components/Shop/Search";
export default class Landing extends Component {
  componentDidMount() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out-back",
    });
    AOS.refresh();
  }
  render() {
    return (
      <Fragment>
        <div id="landing" style={{ overflowX: "hidden" }}>
          <Jumbotron id="jumbo">
            <Container>
              {!isAuthenticated() ? (
                <Fragment>
                  <div className="row">
                    <h1
                      id="catch"
                      className="text-xl-left"
                      data-aos={"fade-right"}
                    >
                      Catch Summer Discouts!
                    </h1>
                  </div>
                  <div className="row mt-5">
                    <Link to="/home" className="ml-5 mt-5">
                      <Button id="btns">Shop Now</Button>
                    </Link>
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
                <h2 id="h22" data-aos={"fade-right"}>
                  <span>Welcome back😄, </span>
                  <span>{isAuthenticated().user.firstname}!</span>
                </h2>
              )}
            </Container>
          </Jumbotron>
          <Container className="justify-content-center">
            <Search></Search>
            <DisplayProducts></DisplayProducts>
          </Container>
        </div>
      </Fragment>
    );
  }
}
