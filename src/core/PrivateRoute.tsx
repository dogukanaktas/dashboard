import { FC, useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps  {
  
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  
  const {isAuth} = useContext(AuthContext)
  
  return (
    <Route
      render={({ location }) => {
        if (isAuth) {
          return children;
        }
        console.log(isAuth)
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
