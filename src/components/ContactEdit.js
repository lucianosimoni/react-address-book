import { useParams } from "react-router-dom";

function ContactEdit() {
  const urlParams = useParams();

  return (
    <>
      <NavigationRail />

      <main>
        <p>Hi I am editing {urlParams.id}</p>
      </main>
    </>
  );
}

export default ContactEdit;
