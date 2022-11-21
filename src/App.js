import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ContactsList from "./components/ContactsList";
import ContactsAdd from "./components/ContactsAdd";
import ContactsView from "./components/ContactsView";
import "./styles/styles.css";
import { Helmet } from "react-helmet";

export default function App() {
  const [contacts, setContacts] = useState([]);

  //TODO: Load all contacts on useEffect when component first renders

  const apiURL =
    "https://eu3.ragic.com/lauec/address-book/2?api&APIKey=TVVHL3ZFUTB5TlB2WlF5dUR4WnorSkNoUjJKb1BwcFlWTFA4ekpJZFc0anB0aEpFVlJFaFRRaWpIQ0FqWXZEeHUyYjgzSEdVSTk5dkY2SzJVWTRQbUE9PQ%3D%3D";

  useEffect(() => {
    const newContacts = [];
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        for (var key in data) {
          const keyValue = data[key];
          newContacts.push(keyValue);
        }
        setContacts([...newContacts]);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Address Book - Luciano</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to={"/contacts/"}>Contacts List</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
            path="/contacts/"
            element={<ContactsList contacts={contacts} />}
          />
          <Route path="/list/add/" element={<ContactsAdd />} />
        </Routes>
      </main>
    </>
  );
}
