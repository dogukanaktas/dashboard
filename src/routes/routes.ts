import Admin from "../pages/Admin";
import Login from "../pages/Login";

const routes = [
  {
    component: Login,
    path: "/login",
    private: false,
  },
  { 
    component: Admin,
    path: "/admin",
    private: true 
  }
];

export default routes;
