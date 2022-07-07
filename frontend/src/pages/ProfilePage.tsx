import React from 'react';
import {
  VStack,
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Divider,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import useAuth from '../useAuth';
import UserDetail from '../components/UserDetail';
import DefaultProfilePhoto from '../assets/profile_icon.png';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box mx={20}>
      <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
        Your Details
      </Heading>
      <Flex flexDirection="row" alignItems="start" w="100%" bg="#FFFEFE">
        <Box margin={5}>
          <Wrap>
            <WrapItem>
              <Avatar size="lg" />
            </WrapItem>
          </Wrap>
        </Box>
        <Box borderRadius={5} bg="#FFFEFE">
          <VStack spacing={4} m={5} align="leading" width="150%">
            <Text fontSize="3xl" color="#005DE2">
              {user?.fName} {user?.lName}
            </Text>
            <Text fontSize="xl">Swyftx</Text>
            <Divider
              orientation="horizontal"
              borderColor="#ecf0f7"
              borderWidth={1}
            />
            <UserDetail label="Email" value={user?.email} />
            <UserDetail label="First Name" value={user?.fName} />
            <UserDetail label="Last Name" value={user?.lName} />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProfilePage;
