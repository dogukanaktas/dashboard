import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Admin: React.FC = () => {
  const { isAuth, logout } = useContext(AuthContext);
  console.log(isAuth);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <p>ADMIN</p>
      <button onClick={() => logout()}>LOG OUT</button>
    </>
  );
};

export default Admin;
