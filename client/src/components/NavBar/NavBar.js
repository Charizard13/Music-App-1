import React, { useState } from "react";
import logo from "./logo.jpg";
import elastic from "./elasticSearch.jpg"
import firebase from "./firebase.png"
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FaHome } from "react-icons/fa";
import {  BsFillPersonPlusFill } from "react-icons/bs";
import { Modal, Container } from "react-bootstrap";
import Register from "../Login/Register.js";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../Login/Dashboard.js";
import Login from "../Login/Login";
import PrivateRoute from "../Login/PrivateRoute";
import ForgotPassword from "../Login/ForgotPassword";
import UpdateProfile from "../Login/UpdateProfile";

function NavBar() {
  const [showRegister, setShowRegister] = useState(false);
  const [input, setInput] = useState([]);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <Navbar
      className="NavBar d-flex"
      style={{ justifyContent: "space-between", backgroundColor: "black" }}
      fixed="top"
    >
      <div   className="d-flex" style={{ flex: "4"}}>
      <Link to="/">
        <div
          className="d-flex"
          style={{
            color: " rgb(220, 53, 69)",
            fontSize: "30px",
            flex: "2"
          }}
        >
          <FaHome />
        </div>
      </Link>
      <Link
        to="/about"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "2", justifyContent: "center" }}
      >
        {" "}
        <Nav>
          <img height="40" width="50" alt="" src={logo} />
        </Nav>
      </Link>
      <Link
        to="/elastic"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "2", justifyContent: "center" }}
      >
        {" "}
        <Nav>
          <img height="40" width="50" alt="" src={elastic} />
        </Nav>
      </Link>
      <Link
        to="/firebase"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "2", justifyContent: "center" }}
      >
        {" "}
        <Nav>
          <img height="40" width="50" alt="" src={firebase} />
        </Nav>
      </Link>
      </div>
      
      <Modal show={showRegister} onHide={handleCloseRegister}>
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh"}}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}
>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/login" component={Register} />
              <Route path="/signup" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
      </Modal>
    
      <Modal show={showLogin} onHide={handleCloseLogin}>
      <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
      </Modal>
      <Link
        to="/artists"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "4", justifyContent: "center" }}
        href="/artists"
      >
        <Nav>Artists</Nav>
      </Link>
      <Link
        to="/songs"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "4", justifyContent: "center"}}
      >
        <Nav className="text" href="/songs">
          Songs
        </Nav>
      </Link>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          className="d-flex"
          style={{ fontSize: "16px", flex: "4" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          style={{
            color: " rgb(220, 53, 69)",
            borderColor: " rgb(220, 53, 69)",
          }}
          variant="outline-info"
        >
          Search
        </Button>
      </Form>
      <Link
        to="/albums"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "4", justifyContent: "center" }}
      >
        <Nav className="text" href="/albums">
          Albums
        </Nav>
      </Link>
      <Link
        to="/playlists"
        className="text d-flex"
        style={{ fontSize: "24px", flex: "4", justifyContent: "center" }}
      >
        <Nav className="text" href="/playlist">
          Playlists
        </Nav>
      </Link>
     
      <div         className="d-flex" style={{ flex: "4"}}
>
      <Button
        className="d-flex"
        style={{
          color: " rgb(220, 53, 69)",
          fontSize: "24px",
          backgroundColor: "black",
          borderColor: "black",
          flex: "2",
          justifyContent: "start"
        }}
      >
        <BsFillPersonPlusFill onClick={handleShowRegister} />
      </Button>
      
        <Button
        onClick={handleShowLogin}
        className="d-flex"
          style={{
            color: " rgb(220, 53, 69)",
            borderColor: " rgb(220, 53, 69)",
            justifyContent: "center",
            flex: "2",  
          }}
          variant="outline-info"
        >
          Login
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
