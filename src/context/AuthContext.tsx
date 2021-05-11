import React, {
  useState,
  createContext,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

// interface Props {
//   children: FC<null> | (() => JSX.Element);
// }

interface IValue {
  isAuth?: boolean;
  setIsAuth?: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<IValue>({});

const AuthProvider: FC<any> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
