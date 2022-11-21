import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ConstactCard from "./ContactsCard";

function ContactsList(props) {
  //"contacts" must be passed as prop to this component
  const { contacts } = props;
  return (
    <main>
      <header>
        <h2>Contacts</h2>
      </header>
      <div className="contacts-list">
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
        <div className="contact-card-add noselect">
          <div className="inner">
            <h2>+</h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactsList;
