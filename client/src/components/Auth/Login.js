import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { signIn } from "../../operations./operations";

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
        <div className="row justify-content-center" id="regform">
          <Form onSubmit={(e) => onSubmit(e)}>
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
              <Input type="submit"></Input>
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
