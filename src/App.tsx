import "./App.css";
import { FC } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./core/PrivateRoute";
import routes from "./routes/routes";

interface AppProps {}

interface IRoute {
  component: FC<any>;
  path: string;
}

const App: FC<AppProps> = () => {
  return (
      <Router>
        <Switch>
          {routes?.map((route, key) => {
            const { component: Component, path }: IRoute = route;
            if (route.private) {
              return (
                <PrivateRoute path={path} key={key}>
                  <Component />
                </PrivateRoute>
              );
            }
            return (
              <Route path={path} exact key={key}>
                <Component />
              </Route>
            );
          })}
          <Redirect to="/login" />
        </Switch>
      </Router>
  );
};

export default App;
