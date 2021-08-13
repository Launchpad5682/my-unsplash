import React, { useRef, useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const history = useHistory();
  const email = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [laoding, setLaoding] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      return setError("Password doesn't match");
    }

    try {
      setError("");
      setLaoding(true);
      signup(email.current.value, password.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLaoding(false);
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" ref={email} required></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={password} required></input>
        </div>
        <div>
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            id="password-confirm"
            type="password"
            ref={passwordConfirm}
            required
          ></input>
        </div>
        <button disabled={laoding} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default SignUp;
