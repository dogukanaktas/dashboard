import { useState, useEffect, createContext, FC } from "react";
import loginService from "../services/loginService";

type LoginType = (formData: object) => void;
type RegisterType = (formData: object) => void;
type LogoutType = () => void;

interface IValue {
  isAuth: boolean | null;
  registerUser: RegisterType;
  login: LoginType;
  logout: LogoutType;
}

export interface AuthContextProps {}

const AuthContext = createContext<IValue>({
  isAuth: null,
  registerUser: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    token && token !== "" && token !== undefined && setIsAuth(true);
  }, [isAuth, token]);

  const login: LoginType = (formData) => {
    loginService
      .getToken("/login", formData)
      .then((accessToken) => {
        localStorage.setItem("accessToken", `Bearer ${accessToken}`);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser: RegisterType = (formData) => {
    loginService
      .getToken("/register", formData)
      .then((accessToken) => {
        localStorage.setItem("accessToken", `Bearer ${accessToken}`);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout: LogoutType = () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
