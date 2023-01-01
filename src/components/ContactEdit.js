import { push, ref } from "firebase/database";
import { useParams } from "react-router-dom";
import { database } from "../utils/Firebase";
import NavigationRail from "./NavigationRail";

function ContactEdit({ loggedInUser, userData }) {
  const urlParams = useParams();
  const contactData = Object.values(userData.contacts).filter(
    (contact) => contact.name === urlParams.name
  )[0];
  const contactKey = Object.keys(userData.contacts).find(
    (key) => userData.contacts[key].name === contactData.name
  );

  return (
    <>
      <NavigationRail />

      <main>
        <header>
          <h1>Editing {urlParams.name}</h1>
        </header>

        <form>
          <section className="sec-profile-edit">
            <h2>Profile</h2>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" defaultValue={contactData.name} />

            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              defaultValue={contactData.username}
            />

            <label htmlFor="type">Work:</label>
            <input
              id="type"
              type="checkbox"
              defaultChecked={contactData.type === "work"}
            />

            <label htmlFor="mobile">Mobile:</label>
            <input id="mobile" type="text" defaultValue={contactData.mobile} />

            <label htmlFor="email">email:</label>
            <input id="email" type="text" defaultValue={contactData.email} />

            <label htmlFor="linkedin">linkedin:</label>
            <input
              id="linkedin"
              type="text"
              defaultValue={contactData.linkedin}
            />

            <label htmlFor="twitter">twitter:</label>
            <input
              id="twitter"
              type="text"
              defaultValue={contactData.twitter}
            />
          </section>

          <section className="sec-address-edit">
            <h2>Address</h2>

            <label htmlFor="country">country:</label>
            <input
              id="country"
              type="text"
              defaultValue={contactData.country}
            />

            <label htmlFor="city">city:</label>
            <input id="city" type="text" defaultValue={contactData.city} />

            <label htmlFor="street">street:</label>
            <input id="street" type="text" defaultValue={contactData.street} />

            <label htmlFor="postcode">postcode:</label>
            <input
              id="postcode"
              type="text"
              defaultValue={contactData.postcode}
            />

            <label htmlFor="remarks">remarks:</label>
            <input
              id="remarks"
              type="text"
              defaultValue={contactData.remarks}
            />
          </section>

          <section className="sec-meetings-edit">
            <h2>Meetings</h2>

            {/* Meeting Cards */}
            <div className="cards-list">
              {contactData.meetings.map((meeting, index) => {
                return (
                  <div className="card noselect" key={index}>
                    <input
                      id="title"
                      type="text"
                      defaultValue={meeting.title}
                    />

                    <label htmlFor="location">Location:</label>
                    <input
                      id="location"
                      type="text"
                      defaultValue={meeting.location}
                    ></input>

                    <label htmlFor="date">Date:</label>
                    <input id="date" type="date" defaultValue={meeting.date} />

                    <label htmlFor="time">Time:</label>
                    <input id="time" type="time" defaultValue={meeting.time} />

                    <div className="edit-btn">
                      <span className="material-symbols-outlined">delete</span>
                    </div>
                  </div>
                );
              })}

              {/* Add Meeting Card */}
              <div className="card-add noselect">
                <div className="inner">
                  <h2>+</h2>
                </div>
              </div>
            </div>
          </section>
        </form>
      </main>
    </>
  );
}

export default ContactEdit;
