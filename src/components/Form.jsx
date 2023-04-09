import { useForm } from './createForm';
import { Wizard } from 'react-use-wizard';

import { setData } from '../utils/localStorage';

import { Buffer } from "buffer";
import { First } from "./First";
import { Second } from './Second';
import { Container } from '@chakra-ui/react';

import { useNavigate } from "react-router-dom";



export function Form() {
  const form = useForm()
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values)
    navigate("/recommend/" + Buffer.from(JSON.stringify(values)).toString("base64"))
    // setData(values)
    
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


