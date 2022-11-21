function ConstactCard({ name, username, email, type }) {
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

      <div className="edit-btn">
        <span className="material-symbols-outlined">edit</span>
      </div>
    </div>
  );
}

export default ConstactCard;
