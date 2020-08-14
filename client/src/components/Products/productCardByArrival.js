import React, { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { addItem } from "../../operations/shoppingCart";
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
import { API } from "../../config";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
export const ProductCardByArrival = ({ product }) => {
  useEffect(() => {
    AOS.init({ easing: "ease-in-out-back" });
    AOS.refresh();
  }, []);

  const addToCart = () => {
    addItem(product, () => {
      ToastsStore.success(`Added ${product.name} to Cart`);
    });
  };

  return (
    <Fragment>
      <Card
        className="col-sm-3 ml-4 mb-4 mr-2 p-0"
        id="productcard"
        data-aos="fade-right"
        style={{ overflowX: "hidden" }}
      >
        <CardTitle id="titlet" className="text-center">
          <span className="p-2">{product.name}</span>
        </CardTitle>
        <CardImg
          src={`${API}/product/photo/${product._id}`}
          className="product-image img-fluid imog"
        ></CardImg>

        <CardBody style={{ background: "#FEEE00", color: "black" }}>
          <p className="desc">{product.description}</p>
          <div className="text-right">
            <CardSubtitle className="text-right">
              <span className="product-price">{product.price} L.E</span>
            </CardSubtitle>
            <Link to={`/product/${product._id}`}>
              <Button className="mt-2 mb-1 mr-3 text-center" id="btn">
                View Product
              </Button>
            </Link>
            <Button
              className="mt-2 mb-1 text-right"
              id="btn"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
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
