import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../../operations./operations";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { addCat } from "../../operations/catOperations";
import {
  ToastsStore,
  ToastsContainerPosition,
  ToastsContainer,
} from "react-toasts";
const AddCategory = ({ history }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    document.title = "Bekam - Create Category";
  }, []);
  //destruture user and token
  const { user, token } = isAuthenticated();
  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    addCat(user._id, token, JSON.stringify(name))
      .then((data) => {
        ToastsStore.success("Created Category Successfully");
        history.push("/");
      })
      .catch((error) => {
        ToastsStore.error("Unable to Create Category");
      });
    /*       .then((data) => {
        console.log(data);

        setError("");
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.error);
      }); */
    //make request to API
  };
  /*   const showSucess = () => {
    if (success) {
      return ToastsStore.success("Created Successfully");
    }
  }; */
  const newCatForm = () => (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <Label className="text-muted">Name</Label>
        <Input
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
        ></Input>
      </FormGroup>

      <Input
        type="submit"
        style={{ background: "#f48176", border: "0px" }}
      ></Input>
    </Form>
  );

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCatForm()}</div>
      </div>
      <ToastsContainer
        store={ToastsStore}
        id="sb7"
        className="toaster"
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </Fragment>
  );
};

export default AddCategory;
