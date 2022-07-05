import React from 'react';
import { Box, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { MyEvent } from "../types/types";

export default function EventBox({ title, startTime }: Partial<MyEvent>) {
  const dateFormat = dayjs(startTime).toString();

  return (
    <Box px={5}>
      <Heading size="xs">{title}</Heading>
      <Text fontSize={13} color="gray.600">{dateFormat}</Text>
    </Box>
  );
}
