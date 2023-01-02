import { Link } from "react-router-dom";

function NavigationRail() {
  return (
    <nav>
      <h2>Address Book</h2>
      <ul>
        <li>
          <Link to={"/react-address-book/contacts"}>Contacts List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationRail;
