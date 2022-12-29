import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/authForms.css";
import { auth } from "../utils/Firebase";

function Login({ setLoggedInUser }) {
  const [errorMessage, setErrorMessage] = useState([false, "", ""]);
  const navigate = useNavigate();

  function handleLoginSubmit(event) {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoggedInUser(userCredential.user);
        navigate("/contacts");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          setErrorMessage([
            true,
            "User not found - Check the entered email.",
            "",
          ]);
        } else if (errorCode === "auth/wrong-password") {
          setErrorMessage([
            true,
            "Wrong password - Check the entered password.",
            "",
          ]);
        } else setErrorMessage([true, errorMessage, errorCode]);
      });
  }

  return (
    <>
      {errorMessage[0] && (
        <div className="auth-error-div">
          <h1>Error</h1>
          <span>{errorMessage[1]}</span>
          <span>{errorMessage[2]}</span>
          <button
            onClick={() => {
              setErrorMessage([false, "", ""]);
            }}
          >
            Ok
          </button>
        </div>
      )}

      <main className="authForms-main">
        <Link to="/contacts">Back</Link>

        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>
            Email
            <input type="email" placeholder="Email address" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>

          <button type="submit">Login</button>
        </form>
        <Link to="/register">No account? Create one here</Link>
      </main>
    </>
  );
}

export default Login;
