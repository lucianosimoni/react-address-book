import { Link } from "react-router-dom";

function ContactCard({ name, username, email, type }) {
  // Update BG color of h3 based on the person type
  const bgColor = type === "personal" ? "#cbcbcb" : "#add6ce";
  return (
    <div className="card noselect">
      <h3 style={{ backgroundColor: bgColor }}>{name}</h3>
      <span>Email:</span>
      <p>{email}</p>
      <span>Username:</span>
      <p>{username}</p>
      <button className="view-btn">View</button>

      <Link to={`/contacts/edit/${name}`}>
        <div className="edit-btn">
          <span className="material-symbols-outlined">edit</span>
        </div>
      </Link>
    </div>
  );
}

export default ContactCard;
