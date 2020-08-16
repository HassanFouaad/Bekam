import React, { Fragment, useState, useEffect } from "react";
import {
  isAuthenticated,
  getPurchaseHistory,
} from "../../operations/operations";

import "./dash.css";
import { Link } from "react-router-dom";
import Delev from "../../img/delivered.png";
import Shipp from "../../img/delivery.png";
//////
const UserDashboard = () => {
  const {
    user: { firstname, lastname, email, role },
  } = isAuthenticated();

  useEffect(() => {
    const user = isAuthenticated().user;
    const token = isAuthenticated().token;
    document.title = `${JSON.stringify(
      isAuthenticated().user.firstname
    )} -  Dashboard`;
    init(user._id, token);
  }, []);

  const [history, setHistory] = useState([]);

  const init = (userId, token) => {
    getPurchaseHistory(userId, token)
      .then((data) => {
        setHistory(data.data);
      })
      .catch((err) => console.log(err));
  };

  /////////////////////
  const userLinks = () => {
    return (
      <div className="bg-light text-center" style={{ height: "100%" }}>
        <h4
          className="card-header"
          style={{ background: "black", color: "#feee00" }}
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
            style={{ background: "black", color: "#feee00" }}
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

  const purchaseHistory = (history) => {
    return (
      <div className="card">
        <h3
          className="card-header"
          style={{ background: "black", color: "#feee00" }}
        >
          Purchase History
        </h3>
        {history.map((order, i) => (
          <li className="list-group-item text-center" key={i}>
            <ul className="list-gorup card-body text-center">
              <li className="list-group-item text-center" id="status">
                <id></id>
                Order Id :{" "}
                <span style={{ color: "#feee00", background: "black" }}>
                  {order._id}
                </span>
              </li>
              <li className="list-group-item text-center">
                {" "}
                <span id="status">Status :</span>
                {order.status === "Delivered" && (
                  <Fragment>
                    <img id="statusIcon" src={Delev}></img>
                    <span id="status"> {order.status}</span>
                  </Fragment>
                )}
                {order.status === "Shipped" && (
                  <Fragment>
                    <img id="statusIcon" src={Shipp}></img>
                    <span id="status"> {order.status}</span>
                  </Fragment>
                )}
                {order.status === "Not processed" && (
                  <Fragment>
                    <span id="status"> {order.status}</span>
                  </Fragment>
                )}
                {order.status === "Processing" && (
                  <Fragment>
                    <span id="status"> {order.status}</span>
                  </Fragment>
                )}
              </li>
              <li className="list-group-item text-center">
                {order.products.map((product, pId) => (
                  <ul className="list-group" id="status" key={pId}>
                    <li className="list-group-item text-center row">
                      <span id="status" className="col-sm-3">
                        {product.count}
                      </span>
                      <Link to={`/product/${product._id}`}>
                        <strong className="col-sm-3">{product.name} </strong>
                      </Link>
                      <span
                        id="status"
                        style={{ background: "black", color: "white" }}
                        className="col-sm-3"
                      >
                        {product.price} L.E
                      </span>
                    </li>
                  </ul>
                ))}
              </li>
            </ul>
          </li>
        ))}
      </div>
    );
  };
  return (
    <Fragment>
      <div className="d-flex" title="User Dashboard">
        <div>{userLinks()}</div>

        <div className="container-fluid">{userInfo()}</div>
      </div>
      <div className="container">{purchaseHistory(history)}</div>
    </Fragment>
  );
};

export default UserDashboard;
