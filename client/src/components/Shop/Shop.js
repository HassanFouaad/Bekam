import React, { useState, useEffect, Fragment } from "react";
import { getCats } from "../../operations./catOperations";
import { ProductCardByArrival } from "../Products/productCardByArrival";
import { Button } from "reactstrap";
import "semantic-ui-css/semantic.min.css";

export const Shop = ({ clicked }) => {
  const [cats, setCats] = useState([]);
  const init = () => {
    getCats()
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Fragment>
      <div style={{ height: "100vh" }}></div>
    </Fragment>
  );
};
