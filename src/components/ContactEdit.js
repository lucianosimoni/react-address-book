import { useParams } from "react-router-dom";

function ContactEdit() {
  const urlParams = useParams();

  return (
    <>
      <NavigationRail />

      <main>
        <h1>Hi I am editing {urlParams.id}</h1>
      </main>
    </>
  );
}

export default ContactEdit;
