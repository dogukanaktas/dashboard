import "./App.css";
import { useState, FC  } from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./core/PrivateRoute";
import routes from "./routes/routes";

const App: FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Router>
        <Switch>
          {routes?.map((route, key) => {
            const { component: Component, path } = route;
            if (route.private) {
              return (
                <PrivateRoute isAuth={toggle} key={key}>
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
        <Link to="/user">go user</Link>
        <Link to="/admin">go admin</Link>
        <Link to="/login">go login</Link>
        <Link to="/">go home</Link>
      </Router>
      <button onClick={() => setToggle((v) => !v)}>toggle auth</button>
    </div>
  );
};

export default App;