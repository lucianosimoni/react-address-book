import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/authForms.css";

function Register() {
  function handleRegisterSubmit(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;

    console.log(name, email, password);
  }

  return (
    <main className="authForms-main">
      <Link to="/contacts">Back</Link>

      <h1>Register</h1>

      <form className="register-form" onSubmit={handleRegisterSubmit}>
        <label>
          Name
          <input type="email" placeholder="ex: Jorge Potato" />
        </label>
        <label>
          Email
          <input type="email" placeholder="ex: jorge@email.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter your new password" />
        </label>

        <button type="submit" className="register-form-submit">
          Register
        </button>
      </form>
      <Link to="/login">Already have an account? Click here</Link>
    </main>
  );
}

export default Register;
