import React, { useState, useEffect, Fragment } from "react";
import { getCart } from "../../operations/shoppingCart";
import { createOrder } from "../../operations/orderOperations";
import { Container } from "reactstrap";
import "./cart.css";
import CheckOut from "./CheckOut";
import { Link } from "react-router-dom";
import { ShowItems } from "./cartItems";
import { isAuthenticated } from "../../operations/operations";
export const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [data, setData] = useState({
    clientAddress: "",
  });
  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const noItems = () => {
    return (
      <h2 className="text-center mt-5 mb-5">
        <div className="mb-3">
          Your cart is Empty,<br></br>
        </div>
        <div>
          <Link
            to="/home"
            style={{
              color: "#FEEE00",
              background: "black",
              textDecoration: "none",
            }}
            className="p-2"
          >
            Continue Shopping !
          </Link>
        </div>
      </h2>
    );
  };
  const handleClick = (e) => {
    e.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const createOrderData = {
      products: items,
      amount: getTotal(),
      address: data.clientAddress,
    };
    createOrder(userId, token, createOrderData);
  };

  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleAddress = (e) => {
    setData({ ...data, clientAddress: e.target.value });
  };
  return (
    <Fragment>
      <Container>
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0
              ? items.map((p, i) => (
                  <Fragment>
                    <ShowItems
                      i={i}
                      p={p}
                      setRun={setRun}
                      run={run}
                    ></ShowItems>
                  </Fragment>
                ))
              : noItems()}
          </tbody>
          <tfoot className="text-center">
            <tr className="text-center">
              <td>
                <Link
                  to="/home"
                  className="btn btn-warning"
                  style={{ background: "#FEEE00" }}
                >
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </Link>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <CheckOut getTotal={getTotal()}></CheckOut>
              </td>

              {isAuthenticated() ? (
                <td className="align-self-center text-center">
                  {items.length > 0 ? (
                    <Fragment>
                      <form>
                        <div className="form-gorup">
                          <label className="text-muted">Delivery Address</label>
                          <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.clientAddress}
                          ></textarea>
                        </div>
                        <Link
                          onClick={handleClick}
                          className="btn btn-success btn-block"
                          style={{ background: "black", color: "#FEEE00" }}
                        >
                          Checkout <i className="fa fa-angle-right"></i>
                        </Link>
                      </form>
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </td>
              ) : (
                <td className="align-self-center text-center">
                  <Link
                    to="/login"
                    className="btn btn-success btn-block"
                    style={{ background: "black", color: "#FEEE00" }}
                  >
                    Signin to Checkout <i className="fa fa-angle-right"></i>
                  </Link>
                </td>
              )}
            </tr>
          </tfoot>
        </table>
      </Container>
    </Fragment>
  );
};
