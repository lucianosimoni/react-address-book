import { async } from "@firebase/util";
import { onValue, push, ref } from "firebase/database";
import { useState } from "react";
import database from "../utils/Firebase";

const userId = 1;

function TestPage() {
  const userRef = ref(database, `/users/${userId}`);
  const contactsRef = ref(database, `/users/${userId}/contacts/`);

  // Get User Data from Database
  onValue(userRef, (snapshop) => {
    const data = snapshop.val();
    console.log(`Snapshop received at ${new Date().toLocaleString()}`);
    renderInPage(data);
  });

  function renderInPage(data) {
    const name = document.getElementById("contactName");
    const list = document.getElementById("contactsList");
    list.innerHTML = "";
    name.innerText = `Name of user ${userId} is ${data.name}`;

    for (const contactID in data.contacts) {
      const contactData = data.contacts[contactID];
      const newItem = document.createElement("li");
      newItem.innerText += `${contactData.name} - `;
      newItem.innerText += `${contactData.email} - `;
      newItem.innerText += `${contactData.city}`;
      list.appendChild(newItem);
    }
  }

  function handleContactSubmit(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const city = event.target[2].value;

    console.log(`Name: ${name}, Email: ${email}, City: ${city}`);

    // Push new contact
    push(contactsRef, { name: name, email: email, city: city });
  }

  return (
    <>
      <h1>Hello test page</h1>
      <form onSubmit={(event) => handleContactSubmit(event)}>
        <input type={"text"} placeholder="Name" required />
        <input type={"email"} placeholder="Email" />
        <input type={"city"} placeholder="City" />
        <input type={"submit"} />
      </form>

      <h2 id="contactName"></h2>
      <h2>Contacts for the user: {userId}</h2>
      <ul id="contactsList">{}</ul>
    </>
  );
}

export default TestPage;
