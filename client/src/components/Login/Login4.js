import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

export default function AddUser() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [problem, setProblem] = useState();
  const [error, setError] = useState();

  function onSubmit() {
    const loginUser = { email: email, password: password };
    axios
      .post("/user/login", loginUser)
      .then((response) => console.log(response.data))
      .catch((data) => setProblem(data.response.data));
  }

  return (
    <Form
      style={{
        textAlign: "center",
        padding: "15px",
        margin: '5px',
        
        fontWeight: "bold",
      }}
    >
      <Form.Label style={{ textAlign: "center", fontSize: "20px", color: "rgb(220, 53, 69)"}}>Register</Form.Label>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="link"
          placeholder=""
        />

        <Form.Label>password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="name"
          placeholder=""
        />
        <Form.Text className="text-muted">
          the password must cotain at least 6 characters
        </Form.Text>
      </Form.Group>
      <div style={{ color: "red" }}>{problem}</div>
      <Button variant="danger" onClick={onSubmit}>
        Login
      </Button>
    </Form>
  );
}
