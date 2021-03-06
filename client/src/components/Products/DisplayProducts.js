import React, { useState, useEffect, Fragment } from "react";
import { getProducts } from "../../operations/catOperations";
import { ToastsStore } from "react-toasts";
import { Carousel } from "react-responsive-carousel";
import { ProductCardBySold } from "./productCardBySold";
import { ProductCardByArrival } from "./productCardByArrival";
import Loader from "react-loader-spinner";
import { Row } from "reactstrap";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
export const DisplayProducts = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadByArrival();
    loadBySold();
    AOS.init({ easing: "ease-in-out-back" });
    AOS.refresh();
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
          className="text-center mb-5"
          type="Oval"
          color="#FEEE00"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      <Row className="row justify-content-center">
        <Link
          data-aos="fade-up"
          to="/bestseller"
          className="col-md-4 text-center"
          style={{ textDecoration: "none" }}
        >
          <h2 id="h2">Best Sellers!</h2>
        </Link>
      </Row>
      <Row className="row justify-content-center" data-aos="fade-up">
        <div className="col-md-4 mt-5 col-sm-4">
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
          className="text-center mt-2 mb-2"
          type="Oval"
          color="#FEEE00"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      <Row className="row justify-content-center">
        <Link
          data-aos="fade-up"
          to="/newarrival"
          className="col-md-4 text-center"
          style={{ textDecoration: "none" }}
        >
          <h2 id="h2">New Arrival</h2>
        </Link>
      </Row>
      <Row className="row justify-content-center text-center mt-5">
        {productsByArrival.map((p, i) => (
          <ProductCardByArrival key={i} product={p}></ProductCardByArrival>
        ))}
      </Row>
    </Fragment>
  );
};
