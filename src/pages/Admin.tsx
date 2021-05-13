import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Admin: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");
  const history = useHistory();

  if (!accessToken) {
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
