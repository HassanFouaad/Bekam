import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  Button,
  CardTitle,
  CardImg,
  CardImgOverlay,
} from "reactstrap";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { API } from "../../config";
export const ProductCardBySold = ({ product }) => {
  return (
    <Fragment>
      <Card className="m-2 p-0" id="productcard">
        <Link style={{ textDecoration: "none" }}>
          <CardTitle
            style={{ color: "#024763", fontWeight: "600", fontSize: "20px" }}
          >
            <p>{product.name}</p>
          </CardTitle>

          <CardImg
            src={`${API}/product/photo/${product._id}`}
            className="product-image img-fluid imog"
          ></CardImg>
        </Link>
        <Link to="/" id="title"></Link>
        <CardBody style={{ background: "#024763", color: "white" }}>
          <div className="text-center">
            <CardSubtitle className="text-center">
              <span className="product-price">{product.price} L.E</span>
            </CardSubtitle>
            <Link to="/">
              <Button className="mt-2 mb-1 text-center" id="btn">
                Add to Cart
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};