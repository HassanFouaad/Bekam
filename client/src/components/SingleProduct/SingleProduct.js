import React, { useEffect, useState, Fragment } from "react";
import {
  getSingleProduct,
  relatedProducts,
} from "../../operations/catOperations";
import { Button, Row } from "reactstrap";
import { API } from "../../config";
import Loader from "react-loader-spinner";
import "./singleproduct.css";
import { Link } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductCardByArrival } from "../Products/productCardByArrival";
const SingleProduct = (props) => {
  const [product, setproduct] = useState({});
  const [productsRelated, setproductsRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    setLoading(true);
    setError(false);
    getSingleProduct(productId)
      .then((data) => {
        if (data) {
          setproduct(data);

          setError(false);
          setLoading(false);
          relatedProducts(data._id)
            .then((data) => {
              if (data) {
                setproductsRelated(data);
                console.log(data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, []);

  return (
    <div className="container-fluid mt-5">
      {loading ? (
        <div content="center" className="justify-content-center mt-5">
          <Loader
            className="text-center"
            type="Oval"
            color="#FEEE00"
            height={100}
            width={100}
            timeout={5000}
          />
        </div>
      ) : (
        <Fragment>
          <div className="row justify-content-center">
            <div className="col-xs-6 col-md-4 text-center justify-content-center">
              <img
                className="img-fluid img-thumbnail text-center"
                src={`${API}/product/photo/${product._id}`}
              />
            </div>
            <div className="col-xs-12 col-md-8">
              <div className="row justify-content-center">
                <h2 id="productname">{product.name}</h2>
              </div>
              <Row className="justify-content-center text-center">
                <div>
                  {product.onsale === "true" && (
                    <span id="saleMark">OnSale</span>
                  )}
                </div>
              </Row>
              <Row className="justify-content-center mt-3 text-center">
                <div>
                  <span>
                    {product.quantity < 1 ? (
                      <span>OUT OF STOCK</span>
                    ) : (
                      <span id="saleMark" className="">
                        {product.quantity} in Stock
                      </span>
                    )}
                  </span>
                </div>
              </Row>
              <div className="card" id="procard">
                <div className="card-header" id="head">
                  Description
                </div>
                <div className="card-body">
                  <h5 className="card-title" id="prodescription">
                    {product.description}
                  </h5>
                  {product.onSale !== "true" ? (
                    <p className="card-text" id="productpriceSale">
                      {product.price} L.E
                    </p>
                  ) : (
                    <p className="card-text" id="productprice">
                      {product.price} L.E
                    </p>
                  )}
                  <Link>
                    <Button id="btns">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        size="2x"
                        color="black"
                      ></FontAwesomeIcon>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </div>{" "}
          <div className="row justify-content-center mt-5">
            <h2>Related Products</h2>
          </div>
          <div className="row">
            {productsRelated.map((p, i) => (
              <ProductCardByArrival product={p} key={i}></ProductCardByArrival>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SingleProduct;
