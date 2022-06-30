import {
  FormControl,
  Text,
  Select,
  Input,
  VStack,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import useAuth from '../useAuth';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Box boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px" py={10} px={20}>
        <FormControl>
          <VStack spacing={4} align="center">
            <Heading size="lg">Your Details</Heading>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Email
                </Text>
                <Input placeholder="medium size" size="md" />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  First Name
                </Text>
                <Input placeholder={user?.email} size="md" />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Last Name
                </Text>
                <Input placeholder="medium size" size="md" />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Department
                </Text>
                <Select placeholder="medium size" size="md" />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Dietary
                </Text>
                <Input placeholder="medium size" size="md" />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Accessibility
                </Text>
                <Input w="100%" placeholder="medium size" size="md" />
              </Flex>
            </Flex>
          </VStack>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
