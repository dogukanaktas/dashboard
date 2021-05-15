import "./App.css";
import { FC } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import routes from "./routes/routes";
import PrivateRoute from "./core/PrivateRoute";
import PublicRoute from "./core/PublicRoute";

interface AppProps {}

interface IRoute {
  component: FC<any>;
  path: string;
  name: string;
}

const App: FC<AppProps> = () => {
  return (
    <Router>
      <Switch>
        {routes?.map((route, key) => {
          const { component: Component, path, name }: IRoute = route;

          if (route.private) {
            return (
              <PrivateRoute path={path} key={key}>
                <Component />
              </PrivateRoute>
            );
          }

          return (
            <PublicRoute path={path} key={key} name={name}>
              <Component />
            </PublicRoute>
          );
        })}
        <Redirect to="/register" />;
      </Switch>
    </Router>
  );
};

export default App;
