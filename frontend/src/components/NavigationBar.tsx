import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  useColorModeValue,
  Link,
  Divider,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Analytics } from 'grommet-icons';
import { NavLink, To } from 'react-router-dom';
import SwyftxLogo from '../assets/swyftx_bird.webp';
import Admin from './permissions/Admin';

interface NavigationLink {
  name: string;
  to: To;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const NavLinks: NavigationLink[] = [
  { name: 'Book Events', to: '/book-events' },
  { name: 'My Bookings', to: '/my-bookings' },
  { name: 'Profile', to: '/profile' },
];

const AdminNavLinks: NavigationLink[] = [
  { name: 'Create Event', to: '/create-event', leftIcon: <AddIcon /> },
];

function renderNavLink(navLinks: NavigationLink[]) {
  return navLinks.map((link) => (
    <Link
      key={link.name}
      as={NavLink}
      to={link.to}
      style={{ textDecoration: 'none' }}
    >
      <Button
        key={link.name}
        variant="solid"
        bg="#0072ed"
        _hover={{ bg: '#005de2' }}
        color="white"
        size="sm"
        leftIcon={link.leftIcon}
      >
        {link.name}
      </Button>
    </Link>
  ));
}

function NavigationBar() {
  return (
    <Box bg={useColorModeValue('#ffffff', '#0a0b0d')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack height="60%">
          <Avatar size="md" src={SwyftxLogo} bg="transparent" />
          <Divider
            orientation="vertical"
            borderColor="#ecf0f7"
            borderWidth={1}
          />
          <Text fontSize="xl">SwyftSocial</Text>
        </HStack>
        <HStack alignItems="center" spacing={2}>
          <Admin>{renderNavLink(AdminNavLinks)}</Admin>
          {renderNavLink(NavLinks)}
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavigationBar;
