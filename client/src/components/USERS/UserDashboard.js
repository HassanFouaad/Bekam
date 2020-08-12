import React, { Fragment, useState } from "react";
import { isAuthenticated } from "../../operations./operations";
import { Container } from "reactstrap";
import "./dash.css";
import { Link } from "react-router-dom";
const UserDashboard = () => {
  const {
    user: { firstname, lastname, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="bg-light text-center" style={{height:"100%"}}>
        <h4
          className="card-header"
          style={{ background: "#F48176", color: "white" }}
        >
          ShortCuts
        </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="links" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="links" to="/profile/update">
              Edit Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <Fragment>
        <div className="card mb-5">
          <h3
            className="card-header"
            style={{ background: "#F48176", color: "white" }}
          >
            Informations
          </h3>
          <ul className=" card-body list-gorup ">
            <li className="list-group-item">
              {firstname} {lastname}
            </li>
            <li className="list-group-item">
              {role === 1 ? "Admin" : "Buyer"}
            </li>
            <li className="list-group-item">{email}</li>
          </ul>
        </div>
      </Fragment>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card">
        <h3
          className="card-header"
          style={{ background: "#F48176", color: "white" }}
        >
          Purchase History
        </h3>
        <ul className="list-gorup card-body">
          <li className="list-group-item">History</li>
        </ul>
      </div>
    );
  };
  return (
    <Fragment>
      <div className="d-flex">
        <div>{userLinks()}</div>

        <div className="container-fluid">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
