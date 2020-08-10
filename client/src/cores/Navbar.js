import React, { Fragment } from "react";
import {
  NavbarBrand,
  Nav,
  Navbar,
  Container,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
  return (
    <Fragment>
      <Navbar className="navbar dark" id="navbar">
        <Container>
          <NavbarBrand>Bekam?</NavbarBrand>
          <Nav>
            <NavItem>
              <Link className="nav-link" to="/home">Shop Now</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/register">Register</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/login">Login</Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};
