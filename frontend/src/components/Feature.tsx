import React, { Flex, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface FeatureProps {
  icon: ReactElement;
  children: ReactElement;
  pb?: number;
}

function Feature(props: FeatureProps) {
  const { icon, children, pb = 2 } = props;

  return (
    <Stack direction="row" align="center" pb={pb}>
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
      {children}
    </Stack>
  );
}

export default Feature;
