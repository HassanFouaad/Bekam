import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { signUp } from "../../operations./operations";
const Register = ({history}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    sucess: false,
    error: false,
  });
  const { firstname, lastname, email, password, password2 } = formData;
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      ToastsStore.error("Passwords Don't Match!");
    } else {
      signUp(firstname, lastname, password, email).then((error) => {
        if (error) {
          setFormData({ ...formData, error: true, sucess: false });
          console.log(error);
         return ToastsStore.error(error);
        } else {
          ToastsStore.success(`Successfully Signed Up, Now you can SignIn`);
          return history.push("/")
        }
      });
    }
  };

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
                value={firstname}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={lastname}
                onChange={(e) => onChange(e)}
              ></Input>
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
              <Input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              ></Input>
            </FormGroup>
            <FormGroup className="col-sm">
              <Input type="submit"></Input>
            </FormGroup>
          </Form>
        </div>
      </div>
      <ToastsContainer store={ToastsStore}></ToastsContainer>
    </div>
  );
};

export default Register;
