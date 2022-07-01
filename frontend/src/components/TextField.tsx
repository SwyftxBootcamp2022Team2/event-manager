import React from 'react';
import { Field, FieldHookConfig, useField } from 'formik';

import {
  FormControl, FormErrorMessage, FormLabel, Input,
} from '@chakra-ui/react';

export default function TextField({ ...props }: FieldHookConfig<string>) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={(!!meta.error && meta.touched)}>
      <FormLabel>{props['aria-label']}</FormLabel>
      <Field as={Input} name={field.name} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
