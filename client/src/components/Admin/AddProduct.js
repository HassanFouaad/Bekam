import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../operations./operations";
import { Form, FormGroup, Label, Input, Container, Row } from "reactstrap";
import { addProduct, getCats } from "../../operations./catOperations";
import {
  ToastsStore,
  ToastsContainerPosition,
  ToastsContainer,
} from "react-toasts";
import Loader from "react-loader-spinner";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    onSale: false,
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;
  ///Load Categories and set Form Data

  const init = () => {
    getCats()
      .then((response) => {
        console.log(response);
        if (response) {
          setValues({
            ...values,
            categories: response.data,
            formData: new FormData(),
          });
        }
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          ToastsStore.error(error);
        }
      });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const { user, token } = isAuthenticated();

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: "true" });
    addProduct(user._id, token, formData)
      .then((response) => {
        if (response) {
          ToastsStore.success("The product has been created successfully");
          setValues({ ...values, error: response, loading: "false" });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          ToastsStore.error(error);
          setValues({ ...values, name: "", loading: false });
        }
      });
  };
  const newProductForm = () => {
    return (
      <form className="mb-3 mt-4" onSubmit={handleSubmit}>
        {loading && (
          <Loader
            className="text-center"
            type="Oval"
            color="#F48176"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <h4>Photo</h4>
        <em>Must be clear, descripe product featuers</em>
        <FormGroup>
          <Label className="btn btn-secondary col-sm-2">
            <Input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            ></Input>
          </Label>
        </FormGroup>
        <hr></hr>
        <FormGroup>
          <Label className="text-muted">Name</Label>
          <Input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          ></Input>
        </FormGroup>
        <hr></hr>
        <FormGroup>
          <Label className="text-muted">Description</Label>
          <Input
            type="textarea"
            className="form-control"
            value={description}
            onChange={handleChange("description")}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label className="text-muted">Price</Label>
          <Input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
          ></Input>
        </FormGroup>
        <hr></hr>
        <FormGroup>
          <Label className="text-muted">Category</Label>
          <br></br>
          <em>Does this product has Shipping Implement?</em>
          <select className="form-control" onChange={handleChange("category")}>
            <option>Select</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </FormGroup>
        <hr></hr>
        <FormGroup>
          <Label className="text-muted">Quantity</Label>
          <Input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
          ></Input>
        </FormGroup>
        <hr></hr>
        <FormGroup>
          <Label className="text-muted">Shipping</Label>
          <br></br>
          <em>Does this product has Shipping Implement?</em>
          <select className="form-control" onChange={handleChange("shipping")}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </FormGroup>
        <FormGroup>
          <Input type="submit"></Input>
        </FormGroup>
      </form>
    );
  };
  return (
    <Container>
      <div className="row">
        <div className="col-md-8 offset-md-2">{newProductForm()}</div>
      </div>
      <ToastsContainer
        store={ToastsStore}
        id="sb7"
        className="toaster"
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </Container>
  );
};

export default AddProduct;
