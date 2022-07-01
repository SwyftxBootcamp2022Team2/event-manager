import {
  FormControl,
  Text,
  Select,
  Input,
  VStack,
  Box,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import ProfileInputRow from '../components/ProfileInputRow';
import useAuth from '../useAuth';

function ProfilePage() {
  const { user } = useAuth();

  const [fName, setFName] = React.useState(user?.fName ?? '');
  const [lName, setLName] = React.useState(user?.lName ?? '');

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
                <Text mx="20px" w="200px" textAlign={'left'}>
                  {user?.email}
                </Text>
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
                <Input
                  value={fName}
                  onChange={(event) => setFName(event.target.value)}
                  size="md"
                />
              </Flex>
            </Flex>
            <ProfileInputRow
              label={'Last Name'}
              value={lName}
              onChange={(event) => setLName(event.target.value)}
            />
            <Flex flexDirection="column">
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text mx="20px" w="200px">
                  Department
                </Text>
                <Select placeholder="placeholder" size="md" />
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
                <Input placeholder="placeholder" size="md" />
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
                <Input w="100%" placeholder="placeholder" size="md" />
              </Flex>
            </Flex>
            <Button onClick={() => {}}></Button>
          </VStack>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
