import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { string } from 'yup/lib/locale';

interface InputField {
  placeholder?: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
}

function formatCapcity(val: Number) {
  return `${val} People`;
}

function parseCapacity(val: string) {
  return val.replace(/[^0-9.]+/g, '');
}

function CreateEventPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      dateTime: dayjs(),
      location: '',
      maxCapacity: '',
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
    {
      placeholder: 'Location',
      id: 'location',
      type: 'text',
      value: formik.values.location,
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
      <NumberInput
        placeholder="Max Capacity"
        id="maxCapacity"
        name="maxCapacity"
        onChange={(c) => formik.setFieldValue('maxCapacity', c)}
        value={formik.values.maxCapacity}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Textarea placeholder="Add description" />

      <Button type="submit" colorScheme="blue">
        Create Event
      </Button>
    </form>
  );
}

export default CreateEventPage;
