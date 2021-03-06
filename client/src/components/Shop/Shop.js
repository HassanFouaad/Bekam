import React, { Fragment } from "react";
import { ProductCardByFilter } from "../Products/ProductCardByFilter";
import "semantic-ui-css/semantic.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Jumbotron } from "reactstrap";

import { Search } from "./Search";
export const Shop = ({ filtered, clicked, loadMore }) => {
  return (
    <Fragment>
      <div style={{ minHeight: "100vh" }} className="container">
        <Search></Search>
        <div className="row text-center">
          <Button
            onClick={clicked}
            style={{
              background: "#FEEE00",
              border: "0px",
              marginLeft: "30px",
              color: "black",
              paddingTop: "10px",
            }}
            className="text-center"
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
        <Row className="row justify-content-center">{loadMore()}</Row>
      </div>
    </Fragment>
  );
};
