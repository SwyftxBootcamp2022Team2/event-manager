import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button, Flex, Heading, VStack,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import useAuth from '../useAuth';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

const initialValues = {
  email: '',
};

function LoginPage() {
  const { login } = useAuth();

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Box boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px" py={10} px={20}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            login(values.email);
          }}
        >
          <VStack as={Form} align="start" spacing={5}>
            <Heading>Log in</Heading>
            <TextField name="email" aria-label="email" />
            <Button
              bg="#0072ed"
              _hover={{ bg: '#005de2' }}
              color="white"
              type="submit"
              colorScheme="teal"
            >
              Submit
            </Button>
          </VStack>
        </Formik>
      </Box>
    </Flex>
  );
}

export default LoginPage;
