import { ref, update, remove } from "firebase/database";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../utils/Firebase";
import NavigationRail from "./NavigationRail";

function ContactEdit({ loggedInUser, userData }) {
  const urlParams = useParams();
  const navigate = useNavigate();
  const contactData = Object.values(userData.contacts).filter(
    (contact) => contact.name === urlParams.name
  )[0];
  const contactKey = Object.keys(userData.contacts).find(
    (key) => userData.contacts[key].name === contactData.name
  );
  const contactRef = ref(
    database,
    `/users/${loggedInUser.uid}/contacts/${contactKey}`
  );
  const [data, setData] = useState(contactData);

  function handleFormSubmit(event) {
    event.preventDefault();
    const formElements = event.target; // Object
    const localData = {};

    for (const element of formElements) {
      if (
        element.id === "" ||
        element.id === "date" ||
        element.id === "location" ||
        element.id === "title" ||
        element.id === "time"
      )
        continue;

      if (element.id === "type") {
        localData[element.id] = element.checked ? "work" : "personal";
        continue;
      }
      // Update key value
      localData[element.id] = element.value;
    }

    update(contactRef, localData);
    setData({ ...data, ...localData });
    navigate("/react-address-book/contacts");
  }

  function createMeeting() {
    const newMeeting = {
      title: "",
      location: "",
      date: "",
      time: "",
    };

    if (data.meetings !== undefined) {
      setData({
        ...data,
        meetings: [...data.meetings, newMeeting],
      });
    } else setData({ ...data, meetings: [newMeeting] });
  }

  function deleteMeeting(meeting) {
    const newMeetings = data.meetings.filter(
      (iteratedMeeting) => iteratedMeeting !== meeting
    );
    setData({ ...data, meetings: newMeetings });
  }

  function deleteContact() {
    remove(contactRef);
    navigate("/react-address-book/contacts");
  }

  return (
    <>
      <NavigationRail />

      <main>
        <header>
          <h1>Editing {urlParams.name}</h1>
        </header>

        <form onSubmit={(event) => handleFormSubmit(event)}>
          <div className="contact-edit-grid">
            <section className="sec-profile-edit">
              <h2>Profile</h2>

              <label htmlFor="name">Name:</label>
              <input
                id="name"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.name}
              />

              <label htmlFor="username">Username:</label>
              <input
                id="username"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.username}
              />

              <label htmlFor="type">Work:</label>
              <label className="switch">
                <input
                  id="type"
                  className="bar-input"
                  type="checkbox"
                  defaultChecked={contactData.type === "work"}
                />
                <span className="slider"></span>
              </label>

              <label htmlFor="mobile">Mobile:</label>
              <input
                id="mobile"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.mobile}
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.email}
              />

              <label htmlFor="linkedin">Linkedin:</label>
              <input
                id="linkedin"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.linkedin}
              />

              <label htmlFor="twitter">Twitter:</label>
              <input
                id="twitter"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.twitter}
              />
            </section>

            <section className="sec-address-edit">
              <h2>Address</h2>

              <label htmlFor="country">Country:</label>
              <input
                id="country"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.country}
              />

              <label htmlFor="city">City:</label>
              <input
                id="city"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.city}
              />

              <label htmlFor="street">Street:</label>
              <input
                id="street"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.street}
              />

              <label htmlFor="postcode">Postcode:</label>
              <input
                id="postcode"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.postcode}
              />

              <label htmlFor="remarks">Remarks:</label>
              <input
                id="remarks"
                className="bar-input section-bar-input"
                type="text"
                defaultValue={contactData.remarks}
              />
            </section>

            <section className="sec-meetings-edit">
              <h2>Meetings</h2>

              {/* Meeting Cards */}
              <div className="cards-list">
                {data.meetings
                  ? data.meetings.map((meeting, index) => {
                      return (
                        <div className="card noselect" key={index}>
                          <input
                            id="title"
                            type="text"
                            placeholder="Meeting Name *"
                            defaultValue={meeting.title}
                            onChange={(event) => {
                              const meetingSpread = [...data.meetings];
                              meetingSpread[index].title = event.target.value;
                              setData({
                                ...data,
                                meetings: meetingSpread,
                              });
                            }}
                            required
                          />

                          <label htmlFor="location">Location:</label>
                          <input
                            id="location"
                            type="text"
                            placeholder="ex: London"
                            defaultValue={meeting.location}
                            onChange={(event) => {
                              const meetingSpread = [...data.meetings];
                              meetingSpread[index].location =
                                event.target.value;
                              setData({
                                ...data,
                                meetings: meetingSpread,
                              });
                            }}
                            required
                          ></input>

                          <label htmlFor="date">Date:</label>
                          <input
                            id="date"
                            type="date"
                            placeholder="dd-MM-yyyy"
                            defaultValue={meeting.date}
                            onChange={(event) => {
                              const meetingSpread = [...data.meetings];
                              meetingSpread[index].date = event.target.value;
                              setData({
                                ...data,
                                meetings: meetingSpread,
                              });
                            }}
                            required
                          />

                          <label htmlFor="time">Time:</label>
                          <input
                            id="time"
                            type="time"
                            placeholder="hh:mm"
                            defaultValue={meeting.time}
                            onChange={(event) => {
                              const meetingSpread = [...data.meetings];
                              meetingSpread[index].time = event.target.value;
                              setData({
                                ...data,
                                meetings: meetingSpread,
                              });
                            }}
                            required
                          />

                          <div
                            className="edit-btn"
                            onClick={() => deleteMeeting(meeting)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </div>
                        </div>
                      );
                    })
                  : null}

                {/* Add Meeting Card */}
                <div className="card-add noselect" onClick={createMeeting}>
                  <div className="inner">
                    <h2>+</h2>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="sec-actions">
            <button className="action-btn" onClick={deleteContact}>
              Delete
            </button>
            <button
              className="action-btn"
              onClick={() => navigate("/react-address-book/contacts")}
            >
              Cancel
            </button>
            <button className="action-btn" type="submit">
              Save
            </button>
          </section>
        </form>
      </main>
    </>
  );
}

export default ContactEdit;
