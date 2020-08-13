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
import { API } from "../../config";
export const ProductCardByArrival = ({ product }) => {
  return (
    <Fragment>
      <Card className="col-sm-3 m-2 mr-5 p-0" id="productcard">
        <CardTitle id="titlet" className="text-center">
          <span className="p-2">{product.name}</span>
        </CardTitle>
        <CardImg
          src={`${API}/product/photo/${product._id}`}
          className="product-image img-fluid imog"
        ></CardImg>

        <CardBody style={{ background: "#024763", color: "white" }}>
          <p className="desc">{product.description}</p>
          <div className="text-right">
            <CardSubtitle className="text-right">
              <span className="product-price">{product.price} L.E</span>
            </CardSubtitle>
            <Link to="/">
              <Button className="mt-2 mb-1 text-right" id="btn">
                Add to Cart
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
