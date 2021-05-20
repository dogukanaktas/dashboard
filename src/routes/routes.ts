import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";

const routes = [
  {
    component: Register,
    path: "/register",
    name: "Register",
    private: false,
  },
  {
    component: Login,
    path: "/login",
    name: "Login",
    private: false,
  },
  {
    component: Admin,
    path: "/admin",
    name: "Admin",
    private: true,
  },
];

export default routes;
