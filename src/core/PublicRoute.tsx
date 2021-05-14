import { FC, useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/AuthContext";

interface PublicRouteProps {
  path: string;
  name: string;
}

const PublicRoute: FC<PublicRouteProps> = ({ children, path, name }) => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth && name === "Login") {
    return <Redirect to="/admin" />;
  } else if (isAuth || name === "Login") {
    return (
      <Route path={path} exact>
        {children}
      </Route>
    );
  }
  return <Redirect to="/login" />;
};

export default PublicRoute;
