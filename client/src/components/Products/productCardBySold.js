import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardSubtitle,
  Button,
  CardTitle,
  CardImg,
} from "reactstrap";

import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { API } from "../../config";
import { BuTTon } from "./BuTTon";
export const ProductCardBySold = ({ product }) => {
  return (
    <Fragment>
      {product.quantity > 0 && (
        <Card className="m-2 p-0" id="productcard" style={{ border: "100px" }}>
          <Link style={{ textDecoration: "none" }}>
            <CardTitle
              style={{ color: "black", fontWeight: "600", fontSize: "20px" }}
            >
              <p>{product.name}</p>
            </CardTitle>

            <CardImg
              src={`${API}/product/photo/${product._id}`}
              className="product-image img-fluid imog"
            ></CardImg>
          </Link>
          <Link to="/" id="title"></Link>
          <CardBody style={{ background: "#FEEE00", color: "white" }}>
            <div className="text-center">
              <CardSubtitle className="text-center">
                <span className="product-price">{product.price} L.E</span>
              </CardSubtitle>
              <Link to={`/product/${product._id}`}>
                <Button className="mt-2 mb-1 mr-3 text-center" id="btn">
                  View Product
                </Button>
              </Link>
              <BuTTon product={product}></BuTTon>
            </div>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
};
