import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface KeyElementsType {
  label: string;
  value: string | undefined;
}

export default function UserDetail({ label, value }: KeyElementsType) {
  return (
    <Flex flexDir="row" w="100%" justifyContent="space-between">
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
}
