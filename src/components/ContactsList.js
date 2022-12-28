import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import NavigationRail from "./NavigationRail";

function ContactsList({ contacts }) {
  return (
    <>
      <NavigationRail />

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
    </>
  );
}

export default ContactsList;
