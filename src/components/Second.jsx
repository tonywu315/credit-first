import { useForm } from './createForm';
import { useWizard } from 'react-use-wizard'

import { Input, Text, Button, Stack } from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'


export function Second() {
  const { previousStep, nextStep } = useWizard();
  const { register, setFieldValue } = useForm();

  return (
    <Stack p={10}>
      <Text fontWeight={'bold'}>Monetary Info</Text>
      <Input mt={5} placeholder="Income" {...register('income')} />
      <Input mt={5} placeholder="Rent" {...register('rent')} />
      <Input mt={5} placeholder="Food" {...register('food')} />
      <Input mt={5} placeholder="Gas" {...register('gas')} />
      <Input mt={5} placeholder="Debt" {...register('debt')} />

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button onClick={previousStep}>Previous</Button>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </Stack>

      );
}




