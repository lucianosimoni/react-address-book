import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contactAdd.css";
import NavigationRail from "./NavigationRail";

function ContactAdd() {
  const [data, setData] = useState({
    1000054: "", //TYPE - REQUIRED
    1000030: "", //NAME - REQUIRED
    1000049: "", //USERNAME
    1000048: "", //EMAIL
    1000033: "", //MOBILE
    1000034: "", //SOCIAL LINKEDIN
    1000035: "", //SOCIAL TWITTER
    1000036: "", //COUNTRY
    1000047: "", //CITY
    1000044: "", //STREET
    1000045: "", //POSTCODE
    1000046: "", //REMARKS
    1000050: [
      //MEETINGS
      // {
      //   title: "Meeting 1",
      //   location: "London",
      //   date: "02/12/2022",
      //   time: "20pm",
      // }
    ],
  });
  const [formPage, setFormPage] = useState(1);
  const [meetings, setMeetings] = useState([]); //Meetings is always updated, and then sent to Data
  const navigate = useNavigate();

  // Called every time the meetings Update. It updates the Data State
  useEffect(() => {
    setData({ ...data, 1000050: [...meetings] });
  }, [meetings]);

  function handlePageFormSubmit(event) {
    event.preventDefault();
    const formElements = event.target; // Object

    // The Create btn in the third page has been pressed
    // POST it using fetch into the API
    if (formPage === 3) {
      const apiURL =
        "https://eu3.ragic.com/lauec/address-book/2?api&APIKey=TVVHL3ZFUTB5TlB2WlF5dUR4WnorSkNoUjJKb1BwcFlWTFA4ekpJZFc0anB0aEpFVlJFaFRRaWpIQ0FqWXZEeHUyYjgzSEdVSTk5dkY2SzJVWTRQbUE9PQ%3D%3D";

      fetch(apiURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((resData) => {
          console.log("Sucess:", resData);
          navigate("/contacts/");
        })
        .catch((error) => {
          console.error("Error:", error);
          navigate("/contacts/");
        });
      return;
    }

    // Copy to access using [] inside the loops
    const dataClone = { ...data };

    for (const element of formElements) {
      // If the Array of Keys from data includes the element name
      if (Object.keys(data).includes(element.name)) {
        // TODO: check for the type bool, and set it to either personal or work
        if (element.name === "1000054") {
          // Set the Data to be either Work or Personal based on the input.
          dataClone[element.name] =
            element.value === "on" ? "work" : "personal";
          continue; // Continue loop. Return here would stop the loop.
        }

        // Update key value
        dataClone[element.name] = element.value;
      }
    }

    setData({ ...dataClone });
    // Can only go till 2, cause return will not let it be read when on the 3
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

  function createContact() {
    //TODO: Implement controlled form
    //send POST to json server on form submit
    console.log("Final Push done");
  }

  return (
    <>
      <NavigationRail />

      <main>
        <div className="add-contact-wrapper">
          <h1 className="contact-add-header">Creating new Contact</h1>

          {/* Render page 1 form or nothing */}
          {formPage === 1 ? (
            <form className="first-page-form" onSubmit={handlePageFormSubmit}>
              <section className="sec-name section-bar-input">
                <span className="material-symbols-outlined">badge</span>
                <input
                  className="bar-input"
                  id="name"
                  placeholder="Name *"
                  name="1000030"
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
                  name="1000049"
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
                  name="1000048"
                  type="email"
                />
              </section>

              <section className="sec-mobile section-bar-input">
                <span className="material-symbols-outlined">smartphone</span>
                <input
                  className="bar-input"
                  id="mobile"
                  placeholder="Mobile"
                  name="1000033"
                  type="tel"
                />
              </section>

              <section className="sec-linkedin section-bar-input">
                <span className="material-symbols-outlined">groups</span>
                <input
                  className="bar-input"
                  id="linkedin"
                  placeholder="LinkedIn"
                  name="1000034"
                  type="text"
                />
              </section>

              <section className="sec-twitter section-bar-input">
                <span className="material-symbols-outlined">groups</span>
                <input
                  className="bar-input"
                  id="twitter"
                  placeholder="Twitter"
                  name="1000035"
                  type="text"
                />
              </section>

              <section className="sec-type">
                <p>Work Contact:</p>
                <label className="switch" id="switch">
                  <input className="bar-input" type="checkbox" name="1000054" />
                  <span className="slider"></span>
                </label>
              </section>

              <section className="sec-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    navigate("/contacts/");
                  }}
                >
                  Cancel
                </button>
                <button className="continue-btn" type="submit">
                  Continue
                </button>
              </section>
            </form>
          ) : null}

          {/* Render page 2 form or nothing */}
          {formPage === 2 ? (
            <form className="second-page-form" onSubmit={handlePageFormSubmit}>
              <section className="sec-country section-bar-input">
                <span className="material-symbols-outlined">public</span>
                <input
                  className="bar-input"
                  placeholder="Country"
                  id="country"
                  name="1000036"
                  type="text"
                />
              </section>

              <section className="sec-city section-bar-input">
                <span className="material-symbols-outlined">apartment</span>
                <input
                  className="bar-input"
                  placeholder="City"
                  id="city"
                  name="1000047"
                  type="text"
                />
              </section>

              <section className="sec-street section-bar-input">
                <span className="material-symbols-outlined">signpost</span>
                <input
                  className="bar-input"
                  placeholder="Street"
                  id="street"
                  name="1000044"
                  type="text"
                />
              </section>

              <section className="sec-postcode section-bar-input">
                <span className="material-symbols-outlined">label</span>
                <input
                  className="bar-input"
                  placeholder="Postcode"
                  id="postcode"
                  name="1000045"
                  type="text"
                />
              </section>

              <section className="sec-remarks section-bar-input">
                <label htmlFor="1000046">Remarks:</label>
                <input
                  className="bar-input"
                  id="remarks"
                  name="1000046"
                  type="text"
                />
              </section>

              <section className="sec-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    navigate("/contacts/");
                  }}
                >
                  Cancel
                </button>
                <button className="continue-btn" type="submit">
                  Continue
                </button>
              </section>
            </form>
          ) : null}

          {/* Render page 3 form or nothing */}
          {formPage === 3 ? (
            <form className="third-page-form" onSubmit={handlePageFormSubmit}>
              <h2>Meetings</h2>

              {/* Meeting Cards */}
              <div className="contacts-list">
                {meetings.map((meeting, index) => {
                  return (
                    <div className="contact-card noselect" key={index}>
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
                        placeholder="Location"
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
                        defaultValue="2022-02-02"
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
                        defaultValue="13:00"
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
                <div
                  className="contact-card-add noselect"
                  onClick={createMeeting}
                >
                  <div className="inner">
                    <h2>+</h2>
                  </div>
                </div>
              </div>

              <section className="sec-actions">
                <button
                  className="cancel-btn"
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
