import React, { useState, useContext, FC, useEffect } from "react";
import { Redirect, useLocation } from "react-router";
import { FormGroup, Input, Label, Button, Form, Alert } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";
import * as yup from "yup";

interface LoginProps {}
interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("email adresi duzgun girilmedi")
    .required("email bos birakilamaz"),
  password: yup
    .string()
    .trim()
    .min(3, "sifre min 3 haneli olmalidir")
    .max(6, ({ value, max }) => {
      return `Password cannot be more than ${max} characters. Your password length is ${value.length}.`;
    })
    .required("sifre bos birakilamaz"),
});

const Login: FC<LoginProps> = () => {
  debugger;
  const [isInvalid, setIsInvalid] = useState(false);
  const { state }: any = useLocation();
  const { isAuth, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const accessToken = localStorage.getItem("accessToken");
  const onSubmit: SubmitHandler<IFormInputs> = async (formData) => {
    const isValid = await schema.isValid(formData);
    console.log(isValid);
    setIsInvalid(!isValid);
    login(formData);
  };

  if (accessToken) {
    return <Redirect to={state?.from || "/admin"} />;
  } 

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup row>
        <Label for="email">Email</Label>
        <Input
          type="text"
          placeholder="email@email.com"
          id="email"
          {...register("email")}
          invalid={isInvalid}
        />
        {errors?.email && (
          <p className="text-danger">{errors?.email?.message}</p>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="text"
          placeholder="password"
          id="password"
          {...register("password")}
        />
        {errors?.password && (
          <p className="text-danger">{errors?.password?.message}</p>
        )}
      </FormGroup>
      <Button color="success" disabled={isInvalid}>
        LOGIN
      </Button>
    </Form>
  );
};

export default Login;
