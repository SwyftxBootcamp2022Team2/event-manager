import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import useAuth from '../useAuth';
import SwyftxLogoWhite from '../assets/swyftx_bird_white.png';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
});

const initialValues = {
  email: '',
};

function LoginPage() {
  const { login } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue('#0072ED', '#0a0b0d')} px={4}>
        <Flex h={20} alignItems="center" justifyContent="space-between">
          <HStack height="60%">
            <Heading fontSize="3xl" color="white">
              SwyftSocial
            </Heading>
            <Avatar size="lg" src={SwyftxLogoWhite} bg="transparent" />
          </HStack>
        </Flex>
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        h="75vh"
        flexDirection="column"
      >
        <Box bg="#FFFEFE" p={10} borderRadius={5} width="30%">
          <Heading size="2xl" paddingBottom="25px" textAlign="center">
            Sign In
          </Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              login(values.email);
            }}
          >
            <VStack as={Form} align="start" spacing={5}>
              <TextField
                name="email"
                aria-label="Email"
                placeholder="name@example.com"
              />
              <Button
                bg="#0072ed"
                _hover={{ bg: '#005de2' }}
                color="white"
                type="submit"
                colorScheme="teal"
                width="100%"
              >
                Login
              </Button>
            </VStack>
          </Formik>
        </Box>
      </Flex>
    </>
  );
}

export default LoginPage;
