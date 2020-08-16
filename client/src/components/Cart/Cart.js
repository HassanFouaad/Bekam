import React, { useState, useEffect, Fragment } from "react";
import { getCart } from "../../operations/shoppingCart";
import { Container } from "reactstrap";
import "./cart.css";
import CheckOut from "./CheckOut";
import { Link } from "react-router-dom";
import { ShowItems } from "./cartItems";
import { isAuthenticated } from "../../operations/operations";
export const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
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
              <td colspan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <CheckOut products={items}></CheckOut>
              </td>

              {isAuthenticated() ? (
                <td className="align-self-center text-center">
                  <a
                    href="#"
                    className="btn btn-success btn-block"
                    style={{ background: "black", color: "#FEEE00" }}
                  >
                    Checkout <i className="fa fa-angle-right"></i>
                  </a>
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
