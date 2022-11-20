import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts } = props;

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((person, index) => {
          const { name, username } = person;
          return (
            <li className="contact" key={index}>
              <p>
                {name} - {username}
              </p>
              <p>View</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
