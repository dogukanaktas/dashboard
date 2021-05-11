import React from "react";
import { Redirect } from "react-router";

const Admin: React.FC = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <p>ADMIN</p>
      <button onClick={() => localStorage.removeItem("accessToken")}>
        LOG OUT
      </button>
    </>
  );
};

export default Admin;
