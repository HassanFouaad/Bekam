import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../operations/operations";
import { Link } from "react-router-dom";
import {
  orderList,
  orderStatus,
  updateOrderStatus,
  shippedOrder,
} from "../../operations/orderOperations";
import moment from "moment";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  const loadOrders = () => {
    const { user, token } = isAuthenticated();
    orderList(user._id, token)
      .then((data) => {
        setOrders(data.data);
      })
      .catch((err) => console.log(err));
  };

  const loadOrderStatus = () => {
    const { user, token } = isAuthenticated();
    orderStatus(user._id, token)
      .then((data) => {
        setStatus(data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadOrders();
    loadOrderStatus();
  }, []);

  const noOrders = (orders) => {
    return orders.length < 1 ? <h4>Currently no Order requests</h4> : null;
  };

  const handleStatusChange = (e, orderID, order) => {
    const { user, token } = isAuthenticated();
    updateOrderStatus(user._id, token, orderID, e.target.value, order);
    shippedOrder(user._id, token, orderID, e.target.value, order)
      .then((data) => {
        loadOrders();
      })
      .catch((err) => console.log(err));
  };

  const handleShippedOrder = (order) => {
    let orderId = order._id;
    let userId = isAuthenticated().user._id;
    let token = isAuthenticated().token;
    let status = order.status;

    return shippedOrder(userId, token, orderId, status, order);
  };

  const showStatus = (order) => {
    return (
      <div className="form-group">
        {order.status !== "Delivered" ? (
          <Fragment>
            <h3 className="mark mb-4">{order.status}</h3>
            <select
              className="form-control"
              onChange={(e) => {
                handleStatusChange(e, order._id, order);
              }}
            >
              <option>Update Status</option>
              {status.map((status, i) => (
                <option key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Fragment>
        ) : (
          <p>Delivered Order</p>
        )}
      </div>
    );
  };
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
        <input
          type="text"
          value={value}
          className="form-control"
          readOnly
        ></input>
      </div>
    </div>
  );
  return (
    <Fragment>
      <h1 className="text-center mt-5">{noOrders(orders)}</h1>
      <div className="row justify-content-center text-center">
        {orders.length > 0 ? (
          <div className="card text-center justify-content-center">
            <h3
              className="card-header text-center"
              style={{ background: "#feee00", color: "black" }}
            >
              Total Orders: {orders.length}
            </h3>
            {orders.map((o, oIndex) => (
              <div key={oIndex}>
                <h5
                  className="text-center"
                  style={{ background: "black", color: "#feee00" }}
                >
                  Order Id: {o._id}
                </h5>
                <ul
                  className="list-gorup mb-2"
                  className="text-center card-body"
                  style={{ background: "black", color: "black" }}
                >
                  <li className="list-group-item">{showStatus(o)}</li>
                  {o.status !== "Delivered" ? (
                    <Fragment>
                      {" "}
                      <div style={{ color: "white" }}>
                        Please Choose Submit this button if the Order has been
                        Delivered
                      </div>
                    </Fragment>
                  ) : (
                    <span style={{ color: "white" }}>Delivered Order</span>
                  )}
                  <li className="list-group-item">{o.amount} L.E</li>
                  <li className="list-group-item">
                    Ordered By: {o.user.firstname} {o.user.lastname}
                  </li>
                  <li className="list-group-item">
                    Ordered at: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {o.address}
                  </li>
                  <li className="list-group-item">
                    <div className="text-center mt-1 mb-1">
                      <h4 className="text-center">
                        Total Products : {o.products.length}
                      </h4>
                    </div>
                    {o.products.map((oP, opIndex) => (
                      <div
                        key={opIndex}
                        className="mb-4"
                        style={{ padding: "20px", border: "1px solid indigio" }}
                      >
                        {showInput("Product name", oP.name)}
                        {showInput("Product Price", oP.price)}
                        {showInput("Product Total", oP.count)}
                        {showInput("Product Id", oP._id)}
                      </div>
                    ))}
                  </li>
                </ul>
                <hr></hr>
                <hr></hr>
                <hr></hr>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}
