import { useParams } from "react-router-dom";

function ContactEdit() {
  const urlParams = useParams();

  return <p>Hi I am editing {urlParams.id}</p>;
}

export default ContactEdit;
