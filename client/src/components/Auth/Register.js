import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Form, FormGroup, Input } from "reactstrap";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
export const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });
  const { firstname, lastname, email, password, password2 } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("NOOOT MATCHED");
      ToastsStore.error("Passwords Don't Match!");
    } else {
      const newUser = { firstname, lastname, email, password };
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const body = JSON.stringify(newUser);
        const res = await axios.post(
          " http://localhost:8000/api/signup",
          body,
          config
        );
      } catch (error) {
        // Error 😨
        if (error.response) {
            ToastsStore.error(error.response.data.error)
          console.log(error.response.data);
        }
      }
    }
  };
  /* catch (error) {
        console.log(error.error);
      } */
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center" id="regform">
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup className="col-sm">
              <Input
                type="text"
                placeholder="First Name"
                name="firstname"
                required
                value={firstname}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
                value={lastname}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>{" "}
            <FormGroup className="col-sm">
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                required
                value={password2}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input type="submit"></Input>
            </FormGroup>
          </Form>
        </div>
        <ToastsContainer
          className="toastcontainer"
          position={ToastsContainerPosition.TOP_RIGHT}
          store={ToastsStore}
        />
      </div>
    </div>
  );
};
