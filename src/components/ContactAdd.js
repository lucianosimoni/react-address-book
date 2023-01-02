import { push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contactAdd.css";
import { database } from "../utils/Firebase";
import NavigationRail from "./NavigationRail";

function ContactAdd({ loggedInUser, userData }) {
  const [data, setData] = useState({
    // type: "", //TYPE - REQUIRED
    // name: "", //NAME - REQUIRED
    // username: "", //USERNAME
    // email: "", //EMAIL
    // mobile: "", //MOBILE
    // linkedin: "", //SOCIAL LINKEDIN
    // twitter: "", //SOCIAL TWITTER
    // country: "", //COUNTRY
    // city: "", //CITY
    // street: "", //STREET
    // postcode: "", //POSTCODE
    // remarks: "", //REMARKS
    // meetings: [
    //MEETINGS
    // {
    //   title: "Meeting 1",
    //   location: "London",
    //   date: "02/12/2022",
    //   time: "20pm",
    // }
    // ],
  });
  const [formPage, setFormPage] = useState(1);
  const [meetings, setMeetings] = useState([]); //Meetings is always updated, and then sent to Data
  const [errorMessage, setErrorMessage] = useState([false, "", ""]);

  const navigate = useNavigate();
  const contactsRef = ref(database, `/users/${loggedInUser.uid}/contacts/`);

  // Called every time the meetings Update. It updates the Data State
  useEffect(() => {
    setData({ ...data, meetings: [...meetings] });
  }, [meetings]);

  function handlePageFormSubmit(event) {
    event.preventDefault();
    const formElements = event.target; // Object

    if (formPage === 1) {
      const inputName = formElements[0].value;
      const found = Object.values(userData.contacts).filter(
        (contact) => contact.name === inputName
      );
      if (found.length === 1) {
        setErrorMessage([
          true,
          "Name already exists! - try with a new name",
          "",
        ]);

        return;
      }
    }

    if (formPage === 3) {
      // Push to the DB
      push(contactsRef, data);
      navigate("/contacts");
      return;
    }

    const dataClone = { ...data };
    for (const element of formElements) {
      if (element.id === "") continue;

      if (element.id === "type") {
        dataClone[element.id] = element.checked ? "work" : "personal";
        continue;
      }
      // Update key value
      dataClone[element.id] = element.value;
    }

    setData({ ...dataClone });
    setFormPage(formPage + 1);
  }

  function createMeeting() {
    const newMeeting = {
      title: "",
      location: "",
      date: "",
      time: "",
    };

    setMeetings([...meetings, newMeeting]);
  }

  function deleteMeeting(meeting) {
    const cloneMeetings = [...meetings];
    const newMeetings = cloneMeetings.filter((iteratedMeeting) => {
      if (iteratedMeeting === meeting) {
        // Dont return the obj we want to remove
        return false;
      }
      return true;
    });
    setMeetings([...newMeetings]);
  }

  return (
    <>
      <NavigationRail />

      {errorMessage[0] && (
        <div className="error-popup-div">
          <h1>Error</h1>
          <span>{errorMessage[1]}</span>
          <span>{errorMessage[2]}</span>
          <button
            onClick={() => {
              setErrorMessage([false, "", ""]);
            }}
          >
            Ok
          </button>
        </div>
      )}

      <main>
        <div className="add-contact-wrapper">
          <h1>Creating new Contact</h1>

          {/* Render page 1 - Basic Info */}
          {formPage === 1 ? (
            <form className="first-page-form" onSubmit={handlePageFormSubmit}>
              <section className="sec-name section-bar-input">
                <span className="material-symbols-outlined">badge</span>
                <input
                  className="bar-input"
                  id="name"
                  placeholder="Name *"
                  type="text"
                  required
                />
              </section>

              <section className="sec-username section-bar-input">
                <span className="material-symbols-outlined">person</span>
                <input
                  className="bar-input"
                  id="username"
                  placeholder="Username"
                  type="text"
                />
              </section>

              <section className="sec-email section-bar-input">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
                <input
                  className="bar-input"
                  id="email"
                  placeholder="E-mail"
                  type="email"
                />
              </section>

              <section className="sec-mobile section-bar-input">
                <span className="material-symbols-outlined">smartphone</span>
                <input
                  className="bar-input"
                  id="mobile"
                  placeholder="Mobile"
                  type="tel"
                />
              </section>

              <section className="sec-linkedin section-bar-input">
                <span className="material-symbols-outlined">groups</span>
                <input
                  className="bar-input"
                  id="linkedin"
                  placeholder="LinkedIn"
                  type="text"
                />
              </section>

              <section className="sec-twitter section-bar-input">
                <span className="material-symbols-outlined">groups</span>
                <input
                  className="bar-input"
                  id="twitter"
                  placeholder="Twitter"
                  type="text"
                />
              </section>

              <section className="sec-type">
                <p>Work Contact:</p>
                <label className="switch" id="switch">
                  <input id="type" className="bar-input" type="checkbox" />
                  <span className="slider"></span>
                </label>
              </section>

              <section className="sec-actions">
                <button
                  className="action-btn"
                  onClick={() => {
                    navigate("/contacts/");
                  }}
                >
                  Cancel
                </button>
                <button className="action-btn" type="submit">
                  Continue
                </button>
              </section>
            </form>
          ) : null}

          {/* Render page 2 - Address form */}
          {formPage === 2 ? (
            <form className="second-page-form" onSubmit={handlePageFormSubmit}>
              <section className="sec-country section-bar-input">
                <span className="material-symbols-outlined">public</span>
                <input
                  className="bar-input"
                  placeholder="Country"
                  id="country"
                  type="text"
                />
              </section>

              <section className="sec-city section-bar-input">
                <span className="material-symbols-outlined">apartment</span>
                <input
                  className="bar-input"
                  placeholder="City"
                  id="city"
                  type="text"
                />
              </section>

              <section className="sec-street section-bar-input">
                <span className="material-symbols-outlined">signpost</span>
                <input
                  className="bar-input"
                  placeholder="Street"
                  id="street"
                  type="text"
                />
              </section>

              <section className="sec-postcode section-bar-input">
                <span className="material-symbols-outlined">label</span>
                <input
                  className="bar-input"
                  placeholder="Postcode"
                  id="postcode"
                  type="text"
                />
              </section>

              <section className="sec-remarks section-bar-input">
                <label htmlFor="remarks">Remarks:</label>
                <input className="bar-input" id="remarks" type="text" />
              </section>

              <section className="sec-actions">
                <button
                  className="action-btn"
                  onClick={() => {
                    navigate("/contacts/");
                  }}
                >
                  Cancel
                </button>
                <button className="action-btn" type="submit">
                  Continue
                </button>
              </section>
            </form>
          ) : null}

          {/* Render page 3 - Meetings Page */}
          {formPage === 3 ? (
            <form className="third-page-form" onSubmit={handlePageFormSubmit}>
              <h2>Add meetings to that contact</h2>

              {/* Meeting Cards */}
              <div className="cards-list">
                {meetings.map((meeting, index) => {
                  return (
                    <div className="card noselect" key={index}>
                      <input
                        type="text"
                        id="title"
                        placeholder="Meeting Name *"
                        onChange={(event) => {
                          const meetingsArray = [...meetings];
                          meetingsArray[index].title = event.target.value;

                          setMeetings([...meetingsArray]);
                        }}
                        required
                      />

                      <label htmlFor="location">Location: *</label>
                      <input
                        type="text"
                        id="location"
                        placeholder="ex: London"
                        onChange={(event) => {
                          const meetingsArray = [...meetings];
                          meetingsArray[index].location = event.target.value;

                          setMeetings([...meetingsArray]);
                        }}
                        required
                      ></input>

                      <label htmlFor="date">Date: *</label>
                      <input
                        type="date"
                        id="date"
                        placeholder="dd-MM-yyyy"
                        onChange={(event) => {
                          const meetingsArray = [...meetings];
                          meetingsArray[index].date = event.target.value;

                          setMeetings([...meetingsArray]);
                        }}
                        required
                      />

                      <label htmlFor="time">Time: *</label>
                      <input
                        placeholder="hh:mm"
                        id="time"
                        type="time"
                        onChange={(event) => {
                          const meetingsArray = [...meetings];
                          meetingsArray[index].time = event.target.value;

                          setMeetings([...meetingsArray]);
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
                })}

                {/* Add Meeting Card */}
                <div className="card-add noselect" onClick={createMeeting}>
                  <div className="inner">
                    <h2>+</h2>
                  </div>
                </div>
              </div>

              <section className="sec-actions">
                <button
                  className="action-btn"
                  onClick={() => {
                    navigate("/contacts/");
                  }}
                >
                  Cancel
                </button>
                <button className="create-btn" type="submit">
                  Create
                </button>
              </section>
            </form>
          ) : null}

          {/* Render Confirmation Page */}
        </div>
      </main>
    </>
  );
}

export default ContactAdd;
