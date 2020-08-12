import React, { Fragment, useState } from "react";
import {
  NavbarBrand,
  Nav,
  Navbar,
  Container,
  NavItem,
  Collapse,
  NavbarToggler,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { faBars, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../operations./operations";
import logo from "../img/logo.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#F48176" };
  }
};
const NavbarComponent = ({ history }) => {
  const [isOpen, setisOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleNav() {
    setisOpen(!isOpen);
  }

  return (
    <Fragment>
      <Navbar className="Navbar" id="navbar" expand="md" className="">
        <NavbarBrand></NavbarBrand>

        <NavbarBrand className="navbar-brand ml-2" href="/">
          <img
            className="img img-responsive"
            style={{ height: "50px", padding: "0px" }}
            src={logo}
          ></img>
        </NavbarBrand>
        <NavbarToggler expand="sm" onClick={toggleNav} className="ml-auto">
          <FontAwesomeIcon icon={faBars} size="lg" color="#F48176" />
        </NavbarToggler>
        <Container>
          <Collapse navbar isOpen={isOpen}>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link
                  className="nav-link"
                  style={isActive(history, "/home")}
                  to="/home"
                >
                  <FontAwesomeIcon
                    className="mr-1"
                    icon={faHome}
                    size="lg"
                    color="#F48176"
                  />
                  <span>Home</span>
                </Link>
              </NavItem>
              {!isAuthenticated() && (
                <Fragment>
                  <NavItem>
                    <Link
                      className="nav-link"
                      to="/register"
                      style={isActive(history, "/register")}
                    >
                      Register
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link
                      className="nav-link"
                      to="/login"
                      style={isActive(history, "/login")}
                    >
                      Login
                    </Link>
                  </NavItem>
                </Fragment>
              )}
              {isAuthenticated() && (
                <Fragment>
                  <NavItem
                    className="nav-link"
                    onClick={() => signOut(() => history.push("/"))}
                  >
                    SignOut
                  </NavItem>
                  <NavItem>
                    <UncontrolledDropdown setActiveFromChild>
                      <DropdownToggle tag="a" className="nav-link" caret>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </DropdownToggle>
                      <DropdownMenu style={{ backgroundColor: "#F48176" }}>
                        <DropdownItem
                          tag="a"
                          href="/dashboard"
                          style={{ color: "black", fontWeight: "700" }}
                        >
                          Dashboard
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};
export default withRouter(NavbarComponent);
