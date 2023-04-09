import { useForm } from './createForm';
import { useWizard } from 'react-use-wizard'

import { Input, Text, Button, Stack, Select } from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'


export function First() {
  const { nextStep } = useWizard();
  const { register, setFieldValue } = useForm();

  return (
    <Stack p={10}>
      <Text fontWeight={'bold'}>Basic Info</Text>
      <Text fontWeight={'bold'}>Age</Text>
      <Input mt={5} placeholder="" type="number" {...register('age')} />
      <Checkbox defaultChecked {...register('student')}>Student?</Checkbox>

      <Text fontWeight={'bold'}>Financial Goals</Text>
      <Select placeholder='' {...register('goals')}>
        <option value='saving'>Saving Money</option>
        <option value='credit'>Building Credit</option>
        <option value='debt'>Paying off Debt</option>
      </Select>

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button type="reset">Reset</Button>
        <Button onClick={nextStep}>Next</Button>
      </Stack>
    </Stack>

      );
}




