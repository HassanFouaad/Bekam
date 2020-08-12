import React, { Fragment, useState } from "react";
import "./SideBar.css";

import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {
  faHome,
  faChartLine,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from "../Auth/Login";
import { isAuthenticated } from "../../operations./operations";
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#F48176" };
  }
};
const Sidebar = ({ history, location }) => {
  return (
    <Fragment>
      <SideNav
        onSelect={(selected) => {
          const to = "/" + selected;
          if (location.pathname !== to) {
            history.push(to);
          }
        }}
        style={{
          backgroundColor: "#F48176",

          marginTop: "75px",
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <FontAwesomeIcon icon={faHome} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          {!isAuthenticated() && (
            <NavItem eventKey="charts">
              <NavIcon>
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Sign In</NavText>
              <NavItem eventKey="charts/linechart"></NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText></NavText>
              </NavItem>
            </NavItem>
          )}
        </SideNav.Nav>
      </SideNav>
    </Fragment>
  );
};

export default Sidebar;
