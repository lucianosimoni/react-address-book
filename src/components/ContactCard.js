import { Link } from "react-router-dom";

function ContactCard({ name, username, email, type, id }) {
  // Update BG color of h3 based on the person type
  const bgColor = type === "personal" ? "#cbcbcb" : "#add6ce";
  return (
    <div className="contact-card noselect">
      <h3 style={{ backgroundColor: bgColor }}>{name}</h3>
      <span>Email:</span>
      <p>{email}</p>
      <span>Username:</span>
      <p>{username}</p>
      <button className="view-btn">View</button>

      <Link to={`/contacts/edit/${id}`}>
        <div className="edit-btn">
          <span className="material-symbols-outlined">edit</span>
        </div>
      </Link>
    </div>
  );
}

export default ContactCard;
