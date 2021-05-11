import { FC } from "react";
import { Redirect, Route } from "react-router";

interface PrivateRouteProps  {
  isAuth: boolean;
  children: any;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isAuth,
  children,
  ...rest
}) => {
  return (
    <Route
      render={({ location }) => {
        if (isAuth) {
          return children;
        }

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
