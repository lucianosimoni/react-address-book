import { analyticsLogEvent, auth, database } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/authForms.css";

function Register({ setLoggedInUser }) {
  const [errorMessage, setErrorMessage] = useState([false, "", ""]);
  let userName;
  const navigate = useNavigate();
  analyticsLogEvent("register-page");

  function handleRegisterSubmit(event) {
    event.preventDefault();

    userName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoggedInUser(userCredential.user);

        set(ref(database, "users/" + userCredential.user.uid), {
          contacts: {},
          name: userName,
        });
        navigate("/react-address-book/contacts");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setErrorMessage([
            true,
            "Weak password - Must be at least 6 digits long.",
            "",
          ]);
        } else if (errorCode === "auth/email-already-in-use") {
          setErrorMessage([
            true,
            "Email already in use - Try with a new email.",
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
        <h1>Register</h1>

        <form className="register-form" onSubmit={handleRegisterSubmit}>
          <label htmlFor="name">Name</label>
          <section className="section-bar-input">
            <span className="material-symbols-outlined">badge</span>
            <input
              id="name"
              className="bar-input"
              type="text"
              placeholder="ex: Jorge Potato"
              required
            />
          </section>
          <label htmlFor="email">Email</label>
          <section className="section-bar-input">
            <span className="material-symbols-outlined">alternate_email</span>
            <input
              id="email"
              className="bar-input"
              type="email"
              placeholder="ex: jorge@email.com"
              required
            />
          </section>
          <label htmlFor="password">Password</label>
          <section className="section-bar-input">
            <span className="material-symbols-outlined">password</span>
            <input
              id="password"
              className="bar-input"
              type="password"
              placeholder="Enter a password"
              required
            />
          </section>

          <section>
            <button
              type="submit"
              className="register-form-submit action-button"
            >
              Register
            </button>
          </section>
        </form>

        <Link to="/react-address-book/login">
          Already have an account? Click here
        </Link>
      </main>
    </>
  );
}

export default Register;
