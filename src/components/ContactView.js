import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationRail from "./NavigationRail";

function ContactView() {
  const [contact, setContact] = useState(false);

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state

  if (!contact) {
    return <p>Loading</p>;
  }

  return (
    <>
      <NavigationRail />

      <main>
        <div>
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <p>
            {contact.street} {contact.city}
          </p>
        </div>
      </main>
    </>
  );
}

export default ContactView;
