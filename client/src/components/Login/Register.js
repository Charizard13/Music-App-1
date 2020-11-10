import React, { useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [problem, setProblem] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setProblem("");
      setLoading(true);
      const newUser = {
        UserName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      axios
        .post("/user/register", newUser)
        .then((data) => console.log(data.data.message))
        .catch((data) => setProblem(data.response.data.message));
        if(error.length > 0 && problem.length > 0){
          history.push("/login");
        }
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control ref={userName} type="name" required />
          <Form.Group className="text-muted"></Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control ref={email} type="email" />
          <Form.Label>Password</Form.Label>
          <Form.Control ref={password} type="password" />
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control ref={confirmPassword} type="password" />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        {problem && <Alert variant="danger">{problem}</Alert>}
        <Button
          disabled={loading}
          className="w-100"
          variant="danger"
          type="submit"
        >
          Sign Up
        </Button>
      </Form>

      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
