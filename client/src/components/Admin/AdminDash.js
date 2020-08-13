import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../operations./operations";
import "../USERS/dash.css";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const {
    user: { firstname, lastname, email, role },
  } = isAuthenticated();
  useEffect(() => {
    document.title = `${JSON.stringify(firstname)} -  Dashboard`;
  }, []);
  const AdminLinks = () => {
    return (
      <div className="bg-light text-center" style={{ height: "100%" }}>
        <h4
          className="card-header"
          style={{ background: "#F48176", color: "white" }}
        >
          ShortCuts
        </h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="links" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="links" to="/create/product">
              Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminInfo = () => {
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

  return (
    <Fragment>
      <div className="d-flex">
        <div style={{ width: "250px" }}>{AdminLinks()}</div>

        <div className="container-fluid">{AdminInfo()}</div>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
