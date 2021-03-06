import { useState, useContext, FC, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useHistory } from 'react-router';
import { FormGroup, Input, Label, Button, Form } from 'reactstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../context/AuthContext';
import * as yup from 'yup';
import Header from '../components/Header';

interface LoginProps {}
interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter valid email address.')
    .required('Email field cannot be blank.'),
  password: yup
    .string()
    .trim()
    // .min(6, ({ value, min }) => {
    //   return `Password cannot be less than ${min} characters. Your password length is ${value.length}.`;
    // })
    .required('Password field cannot be blank.'),
});

const Login: FC<LoginProps> = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const sitekey = process.env.REACT_APP_RECAPTCHA_KEY as string;

  const onSubmit: SubmitHandler<IFormInputs> = async (formData) => {
    const isValid = await schema.isValid(formData);
    setIsInvalid(!isValid);
    if (isValid) {
      reCaptchaRef.current?.reset();
      login(formData);
    }
  };

  const handleReCaptcha = (val: string | null) => {
    console.log(val);
  };

  return (
    <>
      <Header title="LOGIN" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            placeholder="email@email.com"
            id="email"
            {...register('email')}
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
            {...register('password')}
          />
          {errors?.password && (
            <p className="text-danger">{errors?.password?.message}</p>
          )}
        </FormGroup>
        <ReCAPTCHA
          sitekey={sitekey}
          onChange={handleReCaptcha}
          ref={reCaptchaRef}
        />
        <Button color="success" disabled={isInvalid}>
          LOGIN
        </Button>
        <Button color="primary" onClick={() => history.push('/register')}>
          I'M NOT A USER
        </Button>
      </Form>
    </>
  );
};

export default Login;
