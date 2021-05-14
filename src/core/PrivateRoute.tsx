import { FC, useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, path }) => {
  const {isAuth} = useContext(AuthContext);

  if (isAuth) {
    return <Route path={path} exact>{children}</Route>;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
