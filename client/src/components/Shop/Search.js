import React, { useState, useEffect, Fragment } from "react";
import { getCats, searchList } from "../../operations/catOperations";
import { Input, Button, Row } from "reactstrap";
import { ProductCardByFilter } from "../Products/ProductCardByFilter";
import Loader from "react-loader-spinner";
import "./shop.css";
export const Search = () => {
  const [cats, setCats] = useState({
    categories: [],
    category: "",
    searched: false,
    search: "",
    results: [],
  });
  const [loading, setLoading] = useState(false);

  const loadCats = () => {
    getCats()
      .then((response) => {
        setCats({ ...cats, categories: response.data });
      })
      .catch((error) => {});
  };

  const { categories, category, search, searched, results } = cats;
  useEffect(() => {
    loadCats();
  }, []);

  const searchData = () => {
    setLoading(true);
    /* console.log(search, category); */
    if (search) {
      searchList({
        search: search || undefined,
        category: category,
      })
        .then((response) => {
          if (response) {
            setCats({ ...cats, results: response, searched: true });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const handleChange = (name) => (e) => {
    setCats({ ...cats, [name]: e.target.value, searched: false });
  };

  const searchFrom = () => {
    return (
      <form onSubmit={searchSubmit} className="mb-5" id="formform">
        <span className="input-group-text" id="searchform">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select
                className="btn mr-2"
                onChange={handleChange("category")}
                id="optkey"
              >
                <option value="All" className="text-center">
                  Pick
                </option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              id="optkey"
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search Products"
            ></Input>
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <Button
              className="input-grou-text"
              id="optkey"
              style={{ color: "black" }}
            >
              Search
            </Button>
          </div>
        </span>
      </form>
    );
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Products`;
    }
    if (searched && results.length < 1) {
      return `No Products Found!`;
    }
  };
  const searchedProduct = (results = []) => {
    return (
      <div className="row justify-content-center">
        <div className="row">
          <h2 className="mt-4 mb-2" style={{ color: "white" }}>
            {searchMessage(searched, results)}
          </h2>
        </div>
        <div className="row justify-content-center mb-4">
          {results.map((p, i) => {
            return (
              <ProductCardByFilter product={p} key={i}></ProductCardByFilter>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Row className="justify-content-center">{searchFrom()}</Row>
      {loading && (
        <Loader
          className="text-center"
          type="Oval"
          color="#FEEE00"
          height={100}
          width={100}
          timeout={5000}
        />
      )}
      {searchedProduct(results)}
    </Fragment>
  );
};
