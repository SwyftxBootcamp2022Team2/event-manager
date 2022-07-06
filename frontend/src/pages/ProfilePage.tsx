import React from 'react';
import {
  VStack,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react';
import useAuth from '../useAuth';
import UserDetail from '../components/UserDetail';


function ProfilePage() {
  const { user } = useAuth();

  return (
    <Flex alignItems="center" justifyContent="center" w="100%">
      <Box boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px" py={10} px={20} my={20} mx={10}>
        <Heading size="lg">Your Details</Heading>
        <VStack spacing={4} mt={5}>
          <UserDetail label="Email" value={user?.email} />
          <UserDetail label="First Name" value={user?.fName} />
          <UserDetail label="Last Name" value={user?.lName} />
        </VStack>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
