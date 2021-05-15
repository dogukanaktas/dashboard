import { FC } from "react";
import Header from "../components/Header";
import User from "./User";

const Admin: FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Header title="Admin Dashboard"/>
      <User/>
    </div>
  );
};

export default Admin;
