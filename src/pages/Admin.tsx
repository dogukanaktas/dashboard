import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Admin: React.FC = () => {
  const { logout,isAuth } = useContext(AuthContext);
  const history = useHistory();

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <p>ADMIN</p>
      <button
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        LOG OUT
      </button>
    </>
  );
};

export default Admin;
