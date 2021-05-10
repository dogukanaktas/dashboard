import Admin from "../pages/Admin";
import Login from "../pages/Login";
import User from "../pages/User";

const routes = [
  {
    component: Login,
    path: "/login",
    name: "Login",
    private: false,
  },
  {
    component: User,
    path: "/user",
    name: "User",
    private: false,
  },
  { 
    component: Admin,
    path: "/admin",
    name: "Admin",
    private: true 
  }
];

export default routes;
