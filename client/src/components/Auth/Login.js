import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button, FormText } from "reactstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { signIn } from "../../operations/operations";

export const Login = ({ history }) => {
  useEffect(() => {
    document.title = "Bekam - Login";
  }, []);
  const [form, setForm] = useState({ email: "", password: "" });
  const { email, password } = form;

  const onSubmit = (e) => {
    e.preventDefault();

    signIn(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        ToastsStore.error(error.error);
      });
  };
  const onChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <div
          className="row justify-content-center text-center align-self-center"
          id="regform"
        >
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup className="col-sm text-center">
              <h2
                style={{ fontWeight: "700", fontSize: "50px", fontFamily: "Luckiest Guy" }}
              >
                <span>Login</span>
              </h2>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Button id="subbtn">Login</Button>
            </FormGroup>
          </Form>
        </div>
      </div>

      <ToastsContainer
        store={ToastsStore}
        id="sb7"
        className="toaster"
        position={ToastsContainerPosition.TOP_LEFT}
      />
    </div>
  );
};
