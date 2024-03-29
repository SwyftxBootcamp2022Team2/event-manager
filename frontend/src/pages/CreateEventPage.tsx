import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  Flex,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useFormik } from 'formik';
import { Add, Calendar, Group, Location, TextAlignFull } from 'grommet-icons';
import DatePicker from 'react-datepicker';
import Events from '../api/EventsEntity';
import Feature from '../components/Feature';
import useAuth from '../useAuth';
import 'react-datepicker/dist/react-datepicker.css';
import { EventEntity } from '../types/types';

interface DateTimeInputField {
  dateFieldId: string;
  startTimeFieldId: string;
  endTimeFieldId: string;
  dateValue: string | number | readonly string[];
  startTimeValue: string | number | readonly string[];
  endTimeValue: string | number | readonly string[];
  dateOnChange: (e: Date) => void;
  startTimeOnChange: (e: Date) => void;
  endTimeOnChange: (e: Date) => void;
}

function DateTimeInput(props: DateTimeInputField) {
  const {
    dateFieldId,
    startTimeFieldId,
    endTimeFieldId,
    dateValue,
    startTimeValue,
    endTimeValue,
    dateOnChange,
    startTimeOnChange,
    endTimeOnChange,
  } = props;

  return (
    <Flex flexDirection="row" align="center" justifyContent="left">
      <DatePicker
        id={dateFieldId}
        selected={new Date(dateValue.toString())}
        onChange={dateOnChange}
        dateFormat="EEEE, d MMMM yyyy"
        customInput={<Input variant="flushed" pl={3} width="15em" />}
      />
      <DatePicker
        id={startTimeFieldId}
        selected={new Date(startTimeValue.toString())}
        onChange={startTimeOnChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Start Time"
        dateFormat="h:mm aa"
        customInput={
          <Input variant="flushed" pl={3} alignItems="center" width="5em" />
        }
      />
      -
      <DatePicker
        id={endTimeFieldId}
        selected={new Date(endTimeValue.toString())}
        onChange={endTimeOnChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="End Time"
        dateFormat="h:mm aa"
        customInput={
          <Input justifyItems="center" variant="flushed" pl={3} width="5em" />
        }
      />
    </Flex>
  );
}

function CreateEventPage() {
  const { user } = useAuth();
  const toast = useToast();

  const initialFormValues = {
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString(),
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    participationLimit: 0,
  };

  async function submitForm(values: EventEntity) {
    if (user) {
      await Events.createEvent({
        title: values.title,
        email: user.email,
        location: values.location,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        description: values.description,
        participationLimit: values.participationLimit,
      });
    }
  }

  const formik = useFormik({
    initialValues: initialFormValues,

    onSubmit: (values) => {
      submitForm(values);
      formik.resetForm();
      toast({
        title: `Created ${values.title} event!`,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    },
  });

  return (
    <div style={{ marginLeft: 75 }}>
      <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
        Create an Event
      </Heading>
      <Box p={5} borderRadius={5} w="70%" bg="#FFFEFE">
        <form onSubmit={formik.handleSubmit}>
          <Feature icon={<Add color="white" size="20px" />} pb={5}>
            <Input
              id="title"
              placeholder="Event Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              variant="flushed"
              pl={3}
              isRequired
            />
          </Feature>

          <Feature icon={<Calendar color="white" size="20px" />} pb={5}>
            <DateTimeInput
              dateFieldId="date"
              startTimeFieldId="startTime"
              endTimeFieldId="endTimeId"
              dateValue={formik.values.date}
              startTimeValue={formik.values.startTime}
              endTimeValue={formik.values.endTime}
              dateOnChange={(e: Date) =>
                formik.setFieldValue('date', e.toISOString())
              }
              startTimeOnChange={(e: Date) =>
                formik.setFieldValue('startTime', e.toISOString())
              }
              endTimeOnChange={(e: Date) =>
                formik.setFieldValue('endTime', e.toISOString())
              }
            />
          </Feature>

          <Feature icon={<Location color="white" size="20px" />} pb={5}>
            <Input
              id="location"
              placeholder="Location"
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange}
              variant="flushed"
              pl={3}
              isRequired
            />
          </Feature>

          <Feature icon={<Group color="white" size="20px" />} pb={5}>
            <Input
              id="participationLimit"
              placeholder="Max Capacity"
              type="number"
              value={
                formik.values.participationLimit === 0
                  ? ''
                  : formik.values.participationLimit
              }
              onChange={formik.handleChange}
              variant="flushed"
              pl={3}
              isRequired
            />
          </Feature>

          <Feature icon={<TextAlignFull color="white" size="20px" />}>
            <Textarea
              mb={5}
              key="descripion"
              placeholder="Add description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              isRequired
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
