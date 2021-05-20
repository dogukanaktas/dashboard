import { useState, FC } from 'react';
import { useHistory } from 'react-router';
import { FormGroup, Input, Label, Button, Form } from 'reactstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../components/Header';
import { capitilize } from '../utilities';
import userService from '../services/userService';

interface RegisterProps {}
interface IFormInputs {
  email: string;
  firstname: string;
  lastname: string;
  location: string;
  age: string;
  password: string;
}

const schema = yup.object().shape({
  firstname: yup.string().required('First name is required'),

  lastname: yup.string().required('Last name is required'),

  email: yup
    .string()
    .trim()
    .email('Please enter valid email address.')
    .required(({ path }) => `${capitilize(path)} is required`),

  location: yup
    .string()
    .required(({ path }) => `${capitilize(path)} is required`),

  age: yup
    .string()
    .max(4, ({ max }) => `Age cannot be more than ${max} characters.`),

  password: yup
    .string()
    .trim()
    .min(6, ({ min }) => `Password cannot be less than ${min} characters.`)
    .max(
      18,
      ({ value, max }) =>
        `Password cannot be more than ${max} characters. Your password length is ${value.length}.`
    )
    .required(({ path }) => `${capitilize(path)} is required`),
});

const Register: FC<RegisterProps> = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit: SubmitHandler<IFormInputs> = async (formData, e) => {
    const isValid = await schema.isValid(formData);
    setIsInvalid(!isValid);
    const accessToken = await userService.register(formData);
    isValid && !!accessToken && history.push('/login');
  };

  return (
    <>
      <Header title="REGISTER" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="firstName">First name</Label>
          <Input
            type="text"
            placeholder="John"
            id="firstName"
            {...register('firstname')}
          />
          {errors?.firstname && (
            <p className="text-danger">{errors?.firstname?.message}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last name</Label>
          <Input
            type="text"
            placeholder="Smith"
            id="lastName"
            {...register('lastname')}
          />
          {errors?.lastname && (
            <p className="text-danger">{errors?.lastname?.message}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            placeholder="john@smith.com"
            id="email"
            {...register('email')}
            invalid={isInvalid}
          />
          {errors?.email && (
            <p className="text-danger">{errors?.email?.message}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            placeholder="New York"
            id="location"
            {...register('location')}
          />
          {errors?.location && (
            <p className="text-danger">{errors?.location?.message}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input type="text" placeholder="29" id="age" {...register('age')} />
          {errors?.age && <p className="text-danger">{errors?.age?.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="text"
            placeholder="At least 6 characters"
            id="password"
            {...register('password')}
          />
          {errors?.password && (
            <p className="text-danger">{errors?.password?.message}</p>
          )}
        </FormGroup>
        <Button color="success" disabled={isInvalid}>
          REGISTER
        </Button>
        <Button color="primary" onClick={() => history.push('/login')}>
          I'M A USER
        </Button>
      </Form>
    </>
  );
};

export default Register;
