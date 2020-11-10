import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [problem, setProblem] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setProblem("");
      setLoading(true);
      const loginUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        rememberMe: rememberMe,
      };
      axios
        .post("/user/login", loginUser)
        .then((data) => console.log(data.data.message))
        .catch((data) => setProblem(data.response.data.message));
      console.log(problem);
      history.push("/")
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  function onChangeCheckbox() {
    if (!rememberMe) {
      setRememberMe(true);
    } else setRememberMe(false);
  }
  console.log(rememberMe);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            {problem && <Alert variant="danger">{problem}</Alert>}
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              variant="danger"
            >
              Log In
            </Button>
            <div>
              {" "}
              <input type="checkbox" onClick={onChangeCheckbox} />
              <label>Remember me</label>
            </div>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
