import React, { useState, useRef } from "react";

import { isEmail } from "validator";

import { register } from "../actions/auth";
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { addUser } from "../actions/users";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const ModalAddUser = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [modal,setModal] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  }

  

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  
  const onUserTypeChange = (e) => {
    const userType = e.target.value;
    setUserType(userType);
  };

  const onChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
     // ajax
     dispatch(addUser(username, email, password))
        .then(() => {
          toggle();
        })
        .catch(() => {
          console.log('err');
        });
    }
  };


  return (
    <MDBContainer>
    <MDBBtn color="primary" onClick={toggle}>Add user</MDBBtn>
    <MDBModal isOpen={modal} toggle={toggle}>
      <MDBModalHeader toggle={toggle}>Add users to {currentUser.companyName}</MDBModalHeader>
      <MDBModalBody>
      <Form onSubmit={handleRegister} ref={form}>
            <div>
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
        
              <div className="form-group">
                <button className="btn btn-primary btn-block">Add user</button>
              </div>
            </div>

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
    // <div className="col-md-12">
    // <p className="h4 text-center mb-4">Register</p>
        
    //     <Form onSubmit={handleRegister} ref={form}>
    //       {!successful && (
    //         <div>
    //           <div className="form-group">
    //             <label htmlFor="username">Name</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="username"
    //               value={username}
    //               onChange={onChangeUsername}
    //               validations={[required, vusername]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="email"
    //               value={email}
    //               onChange={onChangeEmail}
    //               validations={[required, validEmail]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <Input
    //               type="password"
    //               className="form-control"
    //               name="password"
    //               value={password}
    //               onChange={onChangePassword}
    //               validations={[required, vpassword]}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="type">type</label>
    //             <select
    //             onChange={onUserTypeChange}
    //             name="userType"
    //             className="form-control">
    //               <option value="0">I want to manage my own attendance</option>
    //               <option value="1">I want to manage my workrs attendance</option>
    //             </select>
    //           </div>

    //           {userType == 1 ? 
    //             <div className="form-group">
    //             <label htmlFor="companyName">Company name</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="companyName"
    //               value={companyName}
    //               onChange={onChangeCompanyName}
    //             />
    //           </div>
    //           : ''}

    //           <div className="form-group">
    //             <button className="btn btn-primary btn-block">Sign Up</button>
    //           </div>
    //         </div>
    //       )}

    //       {message && (
    //         <div className="form-group">
    //           <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
    //             {message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton style={{ display: "none" }} ref={checkBtn} />
    //     </Form>
    //   </div>
  );
};

export default ModalAddUser;
