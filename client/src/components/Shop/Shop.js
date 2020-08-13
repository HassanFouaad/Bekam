import React, { useState, useEffect, Fragment } from "react";
import { ProductCardByFilter } from "../Products/ProductCardByFilter";
import "semantic-ui-css/semantic.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
export const Shop = ({ filtered, clicked }) => {
  return (
    <Fragment>
      <div style={{ minHeight: "100vh" }} className="container">
        <div className="row">
          <Button
            onClick={clicked}
            style={{
              background: "#033244",
              border: "0px",
              marginLeft: "30px",
    
            }}
          >
            <FontAwesomeIcon icon={faBars} size="2x"></FontAwesomeIcon>
            <h2>Filter</h2>
          </Button>
        </div>
        <div className="row justify-content-center">
          {filtered.map((product, i) => (
            <ProductCardByFilter
              key={i}
              product={product}
            ></ProductCardByFilter>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
