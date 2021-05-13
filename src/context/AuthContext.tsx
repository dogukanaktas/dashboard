import React, { useState, useEffect, createContext, FC } from "react";
import { useHistory } from "react-router";
import loginService from "../services/loginService";

type LoginType = (formData: object) => void;
type LogoutType = () => void;

interface IValue {
  // isAuth: boolean | null;
  login: LoginType;
  logout: LogoutType;
}

export interface AuthContextProps {}

const AuthContext = createContext<IValue>({
  // isAuth: null,
  login: () => {},
  logout: () => {}
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(false);
  const history = useHistory();

  useEffect(() => {
    
  },[isAuth])

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

  const logout: LogoutType = () => {
    // setIsAuth(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        // isAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
