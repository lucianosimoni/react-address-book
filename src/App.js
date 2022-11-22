import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import ContactsList from "./components/ContactsList";
import ContactAdd from "./components/ContactAdd";
import ContactEdit from "./components/ContactEdit";
import ContactView from "./components/ContactView";
import "./styles/styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const apiURL =
    "https://eu3.ragic.com/lauec/address-book/2?api&APIKey=TVVHL3ZFUTB5TlB2WlF5dUR4WnorSkNoUjJKb1BwcFlWTFA4ekpJZFc0anB0aEpFVlJFaFRRaWpIQ0FqWXZEeHUyYjgzSEdVSTk5dkY2SzJVWTRQbUE9PQ%3D%3D";

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setContacts(Object.values(data));
      });
  }, []);

  function fetchContacts() {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setContacts(Object.values(data));
      });
  }

  return (
    <>
      <Helmet>
        <title>Address Book - Luciano</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Nunito Sans"
          rel="stylesheet"
        />
      </Helmet>
      <nav>
        <h2>Typography</h2>
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
            element={
              <ContactsList contacts={contacts} fetchContacts={fetchContacts} />
            }
          />
          <Route path="/contacts/:id" element={<ContactView />} />
          <Route
            path="/contacts/add/"
            element={<ContactAdd fetchContacts={fetchContacts} />}
          />
          <Route path="/contacts/edit/:id" element={<ContactEdit />} />
        </Routes>
      </main>
    </>
  );
}
