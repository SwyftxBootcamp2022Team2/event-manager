import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl, FormLabel, Input,
} from '@chakra-ui/react';

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
});

function LoginPage() {
  return (
    <Formik initialValues={{ email: '' }} validationSchema={loginSchema} onSubmit={() => console.log('submit')}>
      <form>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input id="email" type="email" />
        </FormControl>
      </form>
    </Formik>
  );
}

export default LoginPage;
