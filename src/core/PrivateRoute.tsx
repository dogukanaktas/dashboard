import { FC } from "react";
import { Redirect, Route } from "react-router";

interface PrivateRouteProps {
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, path }) => {

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Route path={path}>{children}</Route>;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
