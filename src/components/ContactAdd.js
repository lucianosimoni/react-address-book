import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contactAdd.css";

function ContactAdd(props) {
  // setContacts and contacts must be passed as props
  // to this component so new contacts can be added to the
  // state
  const { setContacts, contacts } = props;

  const navigate = useNavigate();
  //TODO: Implement controlled form
  //send POST to json server on form submit

  // TODO:
  // FIRST PAGE
  // type (Top right? Switch Button )
  // Title - Alternatives
  // Name
  // UserName
  // Email
  // Mobile
  // Social Accounts ADD btn [LinkedIn, Twitter]

  // SECOND PAGE
  // Country - Dropdown? External API?
  // Street
  // Postcode
  // City
  // Remarks - Text editor

  // THIRD PAGE
  // Meetings
  // Add new Meeting
  // Edit Meeting
  // CAN BE CARDS AS WELL!

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
      {
        title: "Meeting 1",
        location: "London",
        date: "02/12/2022",
        time: "20pm",
      },
    ],
  });
  const [formPage, setFormPage] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    const formElements = event.target; // Object

    // Copy to access using [] inside the loops
    const dataClone = { ...data };

    for (const element of formElements) {
      const elementName = element.name;
      // If the Array of Keys from data includes the element name
      if (Object.keys(data).includes(elementName)) {
        // Update key value
        dataClone[element.name] = element.value;
      }
    }

    setData({ ...dataClone });
    // Dont go over page 3
    setFormPage(formPage <= 2 ? formPage + 1 : 3);
  }

  function createContact() {
    console.log("Final Push done");
  }

  return (
    <div className="add-contact-wrapper">
      <h1 className="contact-add-header">Creating new Contact</h1>

      {/* Render page 1 form or nothing */}
      {formPage === 1 ? (
        <form className="first-page-form" onSubmit={handleSubmit}>
          <section className="sec-name bar-input">
            <span class="material-symbols-outlined">badge</span>
            <input
              id="name"
              placeholder="Name"
              name="1000030"
              type="text"
              required
            />
          </section>

          <section className="sec-username bar-input">
            <span class="material-symbols-outlined">person</span>
            <input
              id="username"
              placeholder="Username"
              name="1000049"
              type="text"
            />
          </section>

          <section className="sec-email bar-input">
            <span class="material-symbols-outlined">alternate_email</span>
            <input
              id="email"
              placeholder="E-mail"
              name="1000048"
              type="email"
            />
          </section>

          <section className="sec-mobile bar-input">
            <span class="material-symbols-outlined">smartphone</span>
            <input id="mobile" placeholder="Mobile" name="1000033" type="tel" />
          </section>

          <section className="sec-social">
            <p>Should be a optional section that opens something</p>
          </section>

          <section className="sec-type">
            <p>Type of Contact:</p>
            <input
              id="personal"
              name="1000054"
              type="radio"
              value={"personal"}
            />
            <label htmlFor="personal">Personal</label>
            <input id="work" name="1000054" type="radio" value={"work"} />
            <label htmlFor="work">Work</label>
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
        <form className="second-page-form" onSubmit={handleSubmit}>
          <section className="sec-country">
            <label htmlFor="1000036">Country:</label>
            <input id="country" name="1000036" type="text" />
          </section>

          <section className="sec-city">
            <label htmlFor="1000047">City:</label>
            <input id="city" name="1000047" type="text" />
          </section>

          <section className="sec-street">
            <label htmlFor="1000044">Street:</label>
            <input id="street" name="1000044" type="text" />
          </section>

          <section className="sec-postcode">
            <label htmlFor="1000045">Postcode:</label>
            <input id="text" name="1000045" type="text" />
          </section>

          <section className="sec-remarks">
            <label htmlFor="1000046">Remarks:</label>
            <input id="remarks" name="1000046" type="text" />
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
        <form className="third-page-form" onSubmit={handleSubmit}>
          <section className="sec-name">
            <label htmlFor="1000030">Contact Name:</label>
            <input id="name" name="1000030" type="text" required />
          </section>

          <section className="sec-username">
            <label htmlFor="1000049">Username:</label>
            <input id="username" name="1000049" type="text" />
          </section>

          <section className="sec-email">
            <label htmlFor="1000048">Email:</label>
            <input id="email" name="1000048" type="email" />
          </section>

          <section className="sec-mobile">
            <label htmlFor="1000033">Mobile:</label>
            <input id="mobile" name="1000033" type="tel" />
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
            <button className="create-btn" type="submit">
              Create
            </button>
          </section>
        </form>
      ) : null}

      {/* Render Confirmation Page */}
    </div>
  );
}

export default ContactAdd;
