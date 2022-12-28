import { onValue, push, ref } from "firebase/database";
import { database } from "../utils/Firebase";
import NavigationRail from "./NavigationRail";
import { useEffect, useState } from "react";

const userId = 1;

function TestPage() {
  const userRef = ref(database, `/users/${userId}`);
  const contactsRef = ref(database, `/users/${userId}/contacts/`);
  const [data, setData] = useState({});

  // Get User Data from Database
  useEffect(() => {
    onValue(userRef, (snapshop) => {
      const data = snapshop.val();
      console.log(`Snapshop received at ${new Date().toLocaleString()}`);
      setData(data);
    });
  }, []);

  // Create new contact
  function handleContactSubmit(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const city = event.target[2].value;

    // Push new contact
    push(contactsRef, { name: name, email: email, city: city });
  }

  return (
    <>
      <NavigationRail />

      <main>
        <h1>Hello test page</h1>
        <form onSubmit={(event) => handleContactSubmit(event)}>
          <input type={"text"} placeholder="Name" required />
          <input type={"email"} placeholder="Email" />
          <input type={"city"} placeholder="City" />
          <input type={"submit"} />
        </form>

        <h2>Contacts for the user {data.name}:</h2>
        <ul id="contactsList">
          {data.contacts ? (
            Object.values(data.contacts).map((contact, index) => {
              return (
                <li key={index}>
                  {contact.name} | {contact.email} | {contact.city}
                </li>
              );
            })
          ) : (
            <span>No Contacts found...</span>
          )}
        </ul>
      </main>
    </>
  );
}

export default TestPage;
