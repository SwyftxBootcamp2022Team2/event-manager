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

interface Props {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export default function ProfileInputRow({ label, value, onChange }: Props) {
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Text mx="20px" w="200px">
          {label}
        </Text>
        <Input value={value} onChange={onChange} size="md" />
      </Flex>
    </Flex>
  );
}
