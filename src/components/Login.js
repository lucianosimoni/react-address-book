import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/authForms.css";

function Login() {
  function handleLoginSubmit(event) {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    console.log(email, password);
  }

  return (
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
  );
}

export default Login;
