import React, { useState, useContext, FC } from "react";
import { Redirect, useLocation } from "react-router";
import {
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  FormFeedback,
} from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import loginService from "../services/loginService";


interface ILoginInfos {
  email: string | number;
  password: string | number;
}
type HandleLoginType = (e: React.ChangeEvent<HTMLInputElement>) => void;
type FormSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;



const Login: FC<null> = () => {
  const [loginInfos, setLoginInfos] = useState<ILoginInfos>({
    email: "",
    password: "",
  });
  const [ isInvalid,setIsInvalid ] = useState(false);
  const { state }: any = useLocation();
  const { isAuth, setIsAuth } = useContext(AuthContext);


  const handleLogin: HandleLoginType = (e) => {
    const { name, value } = e.target;

    setLoginInfos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit: FormSubmitType = (e) => {
    e.preventDefault();

    loginService
      .getToken("/login", loginInfos)
      .then((accessToken) => {
        localStorage.setItem("accessToken", `Bearer ${accessToken}`);
        setIsAuth && setIsAuth(true);
      })
      .catch((err) => {
        setIsAuth && setIsAuth(false);
        setIsInvalid(true)
        console.log(err)
      });
  };

  if (isAuth) {
    return <Redirect to={state?.from || "/admin"} />;
  }

  return (
    <Form onSubmit={formSubmit}>
      <FormGroup row>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={loginInfos.email}
          onChange={handleLogin}
          invalid={isInvalid}
        />
        <FormFeedback>Username or password is invalid!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={loginInfos.password}
          onChange={handleLogin}
          invalid={isInvalid}
        />
        <FormFeedback>Username or password is invalid!</FormFeedback>
      </FormGroup>
      <Button color="success">LOGIN</Button>
    </Form>
  );
};

export default Login;
