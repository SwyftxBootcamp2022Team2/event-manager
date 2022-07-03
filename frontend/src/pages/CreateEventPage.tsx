import { Box, Button, Heading, Input, Textarea, Flex } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Add, Calendar, Group, Location, TextAlignFull } from 'grommet-icons';
import Feature from '../components/Feature';

interface InputField {
  placeholder?: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
  icon?: any;
}

function CreateEventPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      dateTime: dayjs(),
      location: '',
      maxCapacity: '',
      description: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const createEventFormFields: InputField[] = [
    {
      placeholder: 'Event Title',
      id: 'title',
      type: 'text',
      value: formik.values.title,
      icon: <Add color="white" size="20px" />,
    },
    {
      id: 'dateTime',
      type: 'text',
      value: formik.values.dateTime.format('dddd, MMMM D YYYY'),
      icon: <Calendar color="white" size="20px" />,
    },
    {
      placeholder: 'Location',
      id: 'location',
      type: 'text',
      value: formik.values.location,
      icon: <Location color="white" size="20px" />,
    },
    {
      placeholder: 'Max Capacity',
      id: 'maxCapacity',
      type: 'text',
      value: formik.values.maxCapacity,
      icon: <Group color="white" size="20px" />,
    },
  ];

  return (
    <div style={{ marginLeft: 75 }}>
      <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
        Create an Event
      </Heading>
      <Box p={5} borderRadius={5} w="70%" bg="#FFFEFE">
        <form onSubmit={formik.handleSubmit}>
          {createEventFormFields.map((field) => (
            <Flex flexDirection="column" key={field.id}>
              <Feature icon={field.icon} pb={5}>
                <Input
                  variant="flushed"
                  key={field.id}
                  placeholder={field.placeholder}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  onChange={formik.handleChange}
                  value={field.value}
                  pl={3}
                />
              </Feature>
            </Flex>
          ))}

          <Feature icon={<TextAlignFull color="white" size="20px" />}>
            <Textarea
              mb={5}
              key="descripion"
              placeholder="Add description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Feature>

          <Flex flexDirection="row" justifyContent="flex-end">
            <Button
              type="submit"
              colorScheme="blue"
              mt={5}
              bg="#0072ed"
              _hover={{ bg: '#005de2' }}
            >
              Create Event
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
}

export default CreateEventPage;
