import React from 'react';
import { Field, FieldHookConfig, useField } from 'formik';

import {
  FormControl, FormErrorMessage, FormLabel, Input,
} from '@chakra-ui/react';

export default function TextField(
  props: FieldHookConfig<string> & { placeholder?: string },
) {
  const [field, meta] = useField(props);
  const { placeholder } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const ariaLabel = props['aria-label'];

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel>{ariaLabel}</FormLabel>
      <Field as={Input} name={field.name} placeholder={placeholder} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
