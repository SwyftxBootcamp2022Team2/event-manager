import { Button, Input } from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';

interface InputField {
  placeholder?: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
}

function CreateEventPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      dateTime: dayjs(),
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
    },
    {
      id: 'dateTime',
      type: 'text',
      value: formik.values.dateTime.format('dddd, MMMM D YYYY'),
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      {createEventFormFields.map((field) => (
        <Input
          key={field.id}
          placeholder={field.placeholder}
          id={field.id}
          name={field.id}
          type={field.type}
          onChange={formik.handleChange}
          value={field.value}
        />
      ))}

      <Button type="submit" colorScheme="blue">
        Create Event
      </Button>
    </form>
  );
}

export default CreateEventPage;
