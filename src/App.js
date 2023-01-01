import { useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ContactsList from "./components/ContactsList";
import ContactAdd from "./components/ContactAdd";
import ContactEdit from "./components/ContactEdit";
import ContactView from "./components/ContactView";
import TestPage from "./components/TestPage";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/styles.css";

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
            href="https://fonts.googleapis.com/css?family=Nunito%20Sans"
            rel="stylesheet"
          />
        </Helmet>
      </HelmetProvider>

      <Routes>
        <Route element={<AuthenticateUser loggedInUser={loggedInUser} />}>
          <Route
            path="/contacts/"
            element={<ContactsList loggedInUser={loggedInUser} />}
          />
          <Route path="/contacts/:id" element={<ContactView />} />
          <Route
            path="/contacts/add"
            element={<ContactAdd loggedInUser={loggedInUser} />}
          />
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

      {/* Login button */}
      <div
        className="profile-button"
        onClick={
          loggedInUser
            ? () => {
                setLoggedInUser(null);
                navigate("/login");
              }
            : () => navigate("/login")
        }
      >
        {loggedInUser ? (
          <>
            <img
              src={`https://avatars.dicebear.com/api/initials/${loggedInUser.email}.svg`}
            />
            <span className="material-symbols-outlined">logout</span>
          </>
        ) : (
          <span className="material-symbols-outlined">login</span>
        )}
      </div>
    </>
  );
}

const AuthenticateUser = ({ loggedInUser, redirectPath = "/login" }) => {
  if (!loggedInUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
