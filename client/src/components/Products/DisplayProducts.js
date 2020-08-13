import React, { useState, useEffect, Fragment } from "react";
import { getProducts } from "../../operations./catOperations";
import { ToastsStore } from "react-toasts";
import { Carousel } from "react-responsive-carousel";
import { ProductCardBySold } from "./productCardBySold";
import { ProductCardByArrival } from "./productCardByArrival";
import Loader from "react-loader-spinner";
import { Row } from "reactstrap";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const DisplayProducts = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadByArrival();
    loadBySold();
  }, []);
  const loadBySold = () => {
    setLoading(true);
    getProducts("sold")
      .then((data) => {
        if (data) {
          setLoading(false);
          console.log(data);
          setProductsBySold(data);
        }
      })
      .catch((error) => {
        if (error) {
          setLoading(false);
          ToastsStore.error(error);
          console.log(error);
        }
      });
  };
  const loadByArrival = () => {
    setLoading(true);
    getProducts("createdAt")
      .then((data) => {
        setLoading(false);
        if (data) {
          console.log(data);
          setProductsByArrival(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          ToastsStore.error(error);
          console.log(error);
        }
      });
  };

  return (
    <Fragment>
      {loading && (
        <Loader
          className="text-center"
          type="Oval"
          color="#F48176"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      <Row className="row justify-content-center">
        <h2 id="h2" className="col-md-4 text-center">
          Best Sellers!
        </h2>
      </Row>
      <Row className="row justify-content-center">
        <div className="col-sm-3">
          <Carousel showArrows={true} autoPlay>
            {productsBySold.map((p, i) => (
              
              <Fragment>
                <ProductCardBySold key={i} product={p}></ProductCardBySold>
              </Fragment>
            ))}
          </Carousel>
        </div>
      </Row>
      {loading && (
        <Loader
          className="text-center"
          type="Oval"
          color="#F48176"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      <Row className="row justify-content-center">
        <h2 id="h2" className="col-md-4 text-center">
          New Arrival
        </h2>
      </Row>
      <Row className="row justify-content-center">
        {productsByArrival.map((p, i) => (
          <ProductCardByArrival
            key={i}
            product={p}
            className="col-sm-3"
          ></ProductCardByArrival>
        ))}
      </Row>
    </Fragment>
  );
};
