import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Records from "./components/Records";
import Users from "./components/Users";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBBtn, MDBCard, MDBCardBody,
 MDBCardImage, MDBCardTitle, MDBCardText, MDBCol
} from "mdbreact";


const App = () => {
  const [isOpen,setIsOpen] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // toogle navbar
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      // setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
        <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            {currentUser ? (
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>
            {currentUser.isCompanyOwner ? 
            <MDBNavItem>
              <MDBNavLink to="/users">Manage users</MDBNavLink>
            </MDBNavItem>
            :
            <MDBNavItem>
              <MDBNavLink to={"/records/" + currentUser.clientId}>Records</MDBNavLink>
            </MDBNavItem>
            }
            <MDBNavItem>
              <MDBNavLink to="/login"  onClick={logOut}>logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
            ) : (
              <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/login">login</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>              
              <MDBNavLink to="/register">signup</MDBNavLink>
              </MDBNavItem>
                </MDBNavbarNav>
            )}
        </MDBCollapse>
      </MDBNavbar>
      <MDBCol size="12" className="text-center">
      <MDBCard>
        <MDBCardBody>
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/records/:userId" component={Records} />
            <Route path="/users" component={Users} />
          </Switch>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>
    </Router>
  );
};

export default App;
