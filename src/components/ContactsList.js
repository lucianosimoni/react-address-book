import { Link, useSearchParams } from "react-router-dom";
import ContactCard from "./ContactCard";

function ContactsList({ contacts, fetchContacts }) {
  //"contacts" must be passed as prop to this component
  return (
    <main>
      <header>
        <h2>Contacts</h2>
      </header>
      <div className="contacts-list">
        {contacts.map((person, index) => {
          return (
            <ContactCard
              key={index}
              name={person.name}
              username={person.username}
              email={person.email}
              type={person.type}
              id={person.id}
            />
          );
        })}

        {/* ADD CONTACT CARD */}
        <Link className="link noselect" to={"/contacts/add/"}>
          <div className="contact-card-add noselect">
            <div className="inner">
              <h2>+</h2>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default ContactsList;
