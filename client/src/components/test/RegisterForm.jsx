import { Field, Form, Formik } from 'formik';
import { REGISTER_VALIDATION } from '../../common/yup';
import axios from 'axios';
import { Button } from '@chakra-ui/react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

export const RegisterForm = () => {
  const INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (!values.name) {
      console.log('Please enter a username.');
      return;
    }

    if (!values.email) {
      console.log('Please enter an email.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      console.log('Please enter a valid email address.');
      return;
    }

    if (!values.password || values.password.length < 6) {
      console.log('Password must be at least 6 characters long.');
      return;
    }
    const response = await axios.post('/api/auth/signup', values);
    console.log(response);
    resetForm();
  };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={REGISTER_VALIDATION}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          type="name"
          name="name"
          autoComplete="username"
          placeholder="Username..."
        />
        {/* <label className="submit__lable">Username</label> */}
        {/* <ErrorMessage name="name" component={ErrorMsg} /> */}

        <Field
          type="email"
          name="email"
          autoComplete="email"
          placeholder="E-mail..."
        />
        {/* <label className="submit__lable">E-mail</label> */}

        <Field
          name="password"
          autoComplete="new-password"
          placeholder="Password..."
        />

        {/* <label className="submit__lable">Password</label> */}

        <Button type="submit">Sign up</Button>
      </Form>
    </Formik>
  );
};
