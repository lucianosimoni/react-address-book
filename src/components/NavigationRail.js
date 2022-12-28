import { Link } from "react-router-dom";

function NavigationRail() {
  return (
    <nav>
      <h2>Typography</h2>
      <ul>
        <li>
          <Link to={"/contacts"}>Contacts List</Link>
        </li>
        <li>
          <Link to={"/testpage"}>Test Page</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationRail;
