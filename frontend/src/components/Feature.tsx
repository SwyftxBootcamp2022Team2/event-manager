import React, { Flex, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface FeatureProps {
  text: string;
  icon: ReactElement;
}

function Feature(props: FeatureProps) {
  const { text, icon } = props;

  return (
    <Stack direction="row" align="center" pb={2}>
      <Flex
        w={10}
        h={10}
        align="center"
        justify="center"
        rounded="full"
        bg="#0072ed"
      >
        {icon}
      </Flex>
      <Text fontSize="xl">{text}</Text>
    </Stack>
  );
}

export default Feature;
