import {
  FormControl,
  Text,
  Select,
  VStack,
  Box,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import HorizontalTextField from '../components/HorizontalTextField';
import useAuth from '../useAuth';

function ProfilePage() {
  const { user } = useAuth();

  const [fName, setFName] = React.useState(user?.fName ?? '');
  const [lName, setLName] = React.useState(user?.lName ?? '');
  const [dietary, setDietary] = React.useState(user?.dietary ?? '');
  const [accessibility, setAccessiblity] = React.useState(
    user?.accessibility ?? '',
  );

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
            <HorizontalTextField
              label={'First Name'}
              value={fName}
              onChange={(event) => setFName(event.target.value)}
            />
            <HorizontalTextField
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
            <HorizontalTextField
              label={'Dietary'}
              value={dietary}
              onChange={(event) => setDietary(event.target.value)}
            />
            <HorizontalTextField
              label={'Accessibility'}
              value={accessibility}
              onChange={(event) => setAccessiblity(event.target.value)}
            />
            <Button type="submit" colorScheme="teal">
              SaveChanges
            </Button>
          </VStack>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default ProfilePage;
