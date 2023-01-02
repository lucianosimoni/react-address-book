import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ContactsList from "./components/ContactsList";
import ContactAdd from "./components/ContactAdd";
import ContactEdit from "./components/ContactEdit";
import ContactView from "./components/ContactView";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/styles.css";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
      ? JSON.parse(localStorage.getItem("loggedInUser"))
      : null
  );
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

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
        <Route
          path="/react-address-book/"
          element={<Navigate to={"/react-address-book/contacts"} replace />}
        />

        <Route element={<AuthenticateUser loggedInUser={loggedInUser} />}>
          {/* IF LOGGED IN */}
          <Route
            path="/react-address-book/contacts"
            element={
              <ContactsList
                loggedInUser={loggedInUser}
                userData={userData}
                setUserData={setUserData}
              />
            }
          />
          <Route element={<HasUserData userData={userData} />}>
            {/* IF HAS USER DATA SAVED - Pass in the contacts before */}
            <Route
              path="/react-address-book/contacts/add"
              element={
                <ContactAdd loggedInUser={loggedInUser} userData={userData} />
              }
            />
            <Route
              path="/react-address-book/contacts/:name"
              element={
                <ContactView loggedInUser={loggedInUser} userData={userData} />
              }
            />
            <Route
              path="/react-address-book/contacts/edit/:name"
              element={
                <ContactEdit loggedInUser={loggedInUser} userData={userData} />
              }
            />
          </Route>
        </Route>

        <Route
          path="/react-address-book/login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="/react-address-book/register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Routes>

      {/* User button */}
      <div
        className="profile-button"
        onClick={
          loggedInUser
            ? () => {
                setLoggedInUser(null);
                navigate("/react-address-book/login");
              }
            : () => navigate("/react-address-book/login")
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

const AuthenticateUser = ({ loggedInUser }) => {
  if (!loggedInUser)
    return <Navigate to={"/react-address-book/login"} replace />;
  return <Outlet />;
};

const HasUserData = ({ userData }) => {
  if (!userData)
    return <Navigate to={"/react-address-book/contacts"} replace />;
  return <Outlet />;
};
