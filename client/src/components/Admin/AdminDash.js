import React, { Fragment, useState, useEffect } from "react";
import { isAuthenticated } from "../../operations/operations";
import "../USERS/dash.css";
import { Link } from "react-router-dom";
import { Container, Collapse } from "reactstrap";
import Orders from "./Orders";
const AdminDashboard = () => {
  const {
    user: { firstname, lastname, email, role },
  } = isAuthenticated();
  useEffect(() => {
    document.title = `${JSON.stringify(firstname)} -  Dashboard`;
  }, []);
  const AdminLinks = () => {
    return (
      <div className="col text-center " style={{ height: "100%" }}>
        <h4
          className="card-header"
          style={{ background: "#feee00", color: "black" }}
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
        <li className="list-group-item">
          <Link className="links" to="/home">
            Shop
          </Link>
        </li>
      </div>
    );
  };

  const AdminInfo = () => {
    return (
      <>
        <div className="card">
          <h3
            className="card-header"
            style={{ background: "#feee00", color: "black" }}
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
      </>
    );
  };

  return (
    <Container className="mt-5">
      <div className="row">
        <div style={{ width: "250px" }}>{AdminLinks()}</div>

        <div className="col-8">{AdminInfo()}</div>
      </div>

      <Orders></Orders>
    </Container>
  );
};

export default AdminDashboard;
