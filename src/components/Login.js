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
        navigate("/react-address-book/contacts");
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
        <div className="error-popup-div">
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
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">Email</label>
          <section className="section-bar-input">
            <span className="material-symbols-outlined">alternate_email</span>
            <input
              id="email"
              className="bar-input"
              type="email"
              placeholder="Email address"
              tabIndex={1}
            />
          </section>
          <label htmlFor="password">Password</label>
          <section className="section-bar-input">
            <span className="material-symbols-outlined">password</span>
            <input
              id="password"
              className="bar-input"
              type="password"
              placeholder="Password"
              tabIndex={2}
            />
          </section>

          <section>
            <button className="action-button" type="submit" tabIndex={3}>
              Login
            </button>
          </section>
        </form>

        <Link to="/react-address-book/register" tabIndex={4}>
          No account? Create one here
        </Link>
      </main>
    </>
  );
}

export default Login;
