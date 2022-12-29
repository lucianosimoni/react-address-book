import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ContactsList from "./components/ContactsList";
import ContactAdd from "./components/ContactAdd";
import ContactEdit from "./components/ContactEdit";
import ContactView from "./components/ContactView";
import TestPage from "./components/TestPage";
import "./styles/styles.css";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  const navigate = useNavigate();
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Address Book</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito Sans"
            rel="stylesheet"
          />
        </Helmet>
      </HelmetProvider>

      <Routes>
        <Route element={<AuthenticateUser loggedInUser={loggedInUser} />}>
          <Route
            path="/contacts/"
            element={<ContactsList contacts={contacts} />}
          />
          <Route path="/contacts/:id" element={<ContactView />} />
          <Route path="/contacts/add" element={<ContactAdd />} />
          <Route path="/contacts/edit/:id" element={<ContactEdit />} />
          <Route
            path="/testpage"
            element={<TestPage loggedInUser={loggedInUser} />}
          />
        </Route>

        <Route
          path="/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Routes>
    </>
  );
}

const AuthenticateUser = ({ loggedInUser, redirectPath = "/login" }) => {
  if (!loggedInUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
