import "./App.css";
import { FC } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./core/PrivateRoute";
import routes from "./routes/routes";

interface IRoute {
  component: FC<any>;
  path: string;
}

const App: FC<null> = () => {
  
  return (
    <div>
      <Router>
        <Switch>
          {routes?.map((route, key) => {
            const { component: Component, path }: IRoute = route;
            if (route.private) {
              return (
                <PrivateRoute key={key}>
                  <Component />
                </PrivateRoute>
              );
            }
            return (
              <Route path={path} key={key} exact>
                <Component />
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
