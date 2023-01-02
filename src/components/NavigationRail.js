import { Link } from "react-router-dom";

function NavigationRail() {
  return (
    <nav className="navigation-rail">
      <h2>Address Book</h2>
      <ul>
        <li>
          <Link className="link" to={"/react-address-book/contacts"}>
            Contacts List
          </Link>
        </li>
        <li>
          <Link className="link" to={"/react-address-book/about"}>
            About the Dev
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationRail;
