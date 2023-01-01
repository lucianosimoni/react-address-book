import { onValue, ref } from "firebase/database";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "../utils/Firebase";
import ContactCard from "./ContactCard";
import NavigationRail from "./NavigationRail";

function ContactsList({ loggedInUser, userData, setUserData }) {
  const userRef = ref(database, `/users/${loggedInUser.uid}`);

  // Get User Data from Database
  useEffect(() => {
    onValue(userRef, (snapshop) => {
      const data = snapshop.val();
      setUserData(data);
    });
  }, []);

  return (
    <>
      <NavigationRail />

      <main>
        <header>
          <h1>Contacts</h1>
        </header>

        <div className="contacts-list">
          {userData
            ? Object.values(userData.contacts).map((contact, index) => {
                return (
                  <ContactCard
                    key={index}
                    name={contact.name}
                    username={contact.username}
                    email={contact.email}
                    type={contact.type}
                  />
                );
              })
            : null}

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
