import { Button, useToast } from '@chakra-ui/react';

function ErrorToast() {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Unable to retrieve event data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}
