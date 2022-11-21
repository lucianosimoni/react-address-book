import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ConstactCard from "./ContactsCard";

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
          return (
            <ConstactCard
              key={index}
              name={person.name}
              username={person.username}
              email={person.email}
              type={person.type}
            />
          );
        })}
      </ul>
    </>
  );
}

export default ContactsList;
