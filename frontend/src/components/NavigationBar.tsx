import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavLink, To } from 'react-router-dom';
import SwyftxLogo from '../assets/swyftx_bird.jpeg';

interface NavigationLink {
  name: string;
  to: To;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const NavLinks: NavigationLink[] = [
  { name: 'Create Event', to: '/create-event', leftIcon: <AddIcon /> },
  { name: 'Book Events', to: '/book-events' },
  { name: 'My Bookings', to: '/my-bookings' },
  { name: 'Profile', to: '/profile' },
];

function NavigationBar() {
  return (
    <Box bg={useColorModeValue('#ffffff', '#0a0b0d')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Avatar size="md" src={SwyftxLogo} />
        </Box>
        <HStack alignItems="center" spacing={2}>
          {NavLinks.map((link) => (
            <Button
              key={link.name}
              variant="solid"
              bg="#0072ed"
              _hover={{ bg: '#005de2' }}
              color="white"
              size="sm"
              leftIcon={link.leftIcon}
            >
              <Link as={NavLink} to={link.to}>
                {link.name}
              </Link>
            </Button>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavigationBar;
