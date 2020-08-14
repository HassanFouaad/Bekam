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
  Dropdown,
} from "reactstrap";
import {
  faBars,
  faHome,
  faUser,
  faUserPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../operations/operations";
import logo from "../img/logo.png";
import { Login } from "../components/Auth/Login";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#feee00" };
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
      <Navbar className="" id="navbar" expand="md" fixed="top">
        <Container>
          <NavbarBrand className="navbar-brand ml-2" href="/">
            <img
              className="img img-responsive"
              style={{ height: "50px", padding: "0px" }}
              src={logo}
            ></img>
          </NavbarBrand>
          <NavbarBrand className="ml-auto">
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
          </NavbarBrand>
          <NavbarToggler expand="sm" onClick={toggleNav} className="ml-auto">
            <FontAwesomeIcon icon={faBars} size="lg" color="#feee00" />
          </NavbarToggler>

          <Collapse navbar isOpen={isOpen}>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link
                  className="nav-link"
                  style={isActive(history, "/home")}
                  to="/home"
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faHome}
                    size="lg"
                    color="#feee00"
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
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faUserPlus}
                        size="lg"
                        color="#feee00"
                      />
                      Register
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link
                      className="nav-link"
                      to="/login"
                      style={isActive(history, "/login")}
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faUser}
                        size="lg"
                        color="#feee00"
                      />
                      Login
                    </Link>
                  </NavItem>
                  <NavItem>
                    <UncontrolledDropdown>
                      <DropdownToggle
                        className="nav-link mt-1"
                        style={{ backgroundColor: "black", border: "0px" }}
                        caret
                      ></DropdownToggle>
                      <DropdownMenu style={{ backgroundColor: "#feee00" }}>
                        <Login></Login>
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                        <FontAwesomeIcon
                          icon={faUser}
                          color="#feee00"
                        ></FontAwesomeIcon>
                      </DropdownToggle>
                      <DropdownMenu style={{ backgroundColor: "#feee00" }}>
                        <DropdownItem>
                          <Link
                            style={{
                              color: "black",
                              fontWeight: "700",
                              textDecoration: "none",
                            }}
                            to={
                              isAuthenticated().user.role === 1
                                ? "/admin/dashboard"
                                : "/user/dashboard"
                            }
                          >
                            Dashboard
                          </Link>
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
