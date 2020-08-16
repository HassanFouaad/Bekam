import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { addItem } from "../../operations/shoppingCart";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
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
import { BuTTon } from "./BuTTon";

import { API } from "../../config";
export const ProductCardByFilter = ({ product }) => {
  const addToCart = () => {
    addItem(product, () => {
      ToastsStore.success(`Added ${product.name} to Cart`);
    });
  };

  return (
    <Fragment>
      <Card className="m-2 col-md-3 col-sm p-0 mt-5" id="productcard">
        <Link style={{ textDecoration: "none" }}>
          <CardTitle
            className="text-center"
            style={{
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
              background: "#feee00",
            }}
          >
            <p>{product.name}</p>
          </CardTitle>

          <CardImg
            src={`${API}/product/photo/${product._id}`}
            className="product-image img-fluid imog"
          ></CardImg>
        </Link>
        <Link to="/" id="title"></Link>
        <CardBody style={{ background: "#feee00", color: "white" }}>
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
      <ToastsContainer
        store={ToastsStore}
        id="sb7"
        className="toaster"
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </Fragment>
  );
};
