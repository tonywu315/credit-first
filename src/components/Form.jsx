import { useForm } from './createForm';
import { Wizard } from 'react-use-wizard';



import { First } from "./First";
import { Second } from './Second';
import { Container } from '@chakra-ui/react';

export function Form() {
  const form = useForm()

  const handleSubmit = (values) => {
    console.log(values)
  };

  function handleReset(e) {}
  
  return (
    <Container maxW="container.md">
      <form
        onReset={form.handleReset(handleReset)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Wizard>
          <First />
          <Second/>
        </Wizard>
      </form>
    </Container>
    
  );
}


