import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          setLoading(false);
            //props.history.push("/home");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };


  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    
    <div className="col-md-12">
     <MDBContainer>
  <MDBRow>
    <MDBCol md="12">
    <Form onSubmit={handleLogin} ref={form}>
        <p className="h4 text-center mb-4">Login</p>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
        </label>
        <input type="email" className="form-control"
        name="username"
        value={username}
        onChange={onChangeUsername}
        validations={[required]} />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control"
        name="password"
        value={password}
        onChange={onChangePassword}
        validations={[required]} />
        <div className="text-center mt-4">
          <MDBBtn color="primary" type="submit"  disabled={loading}>
            Login
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
          </MDBBtn>
        </div>
        
        {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>
  );
};

export default Login;
