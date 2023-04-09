import { Container, Box, Center, Button, VStack } from "@chakra-ui/react"

import {
    Link
  } from "react-router-dom";

export function Home() {
  return (
    <Container>
      <Box w="100%" h="1080px">
        <Center mt="64">
          <VStack>
            <img src="./creditfirst.png"/>
            <Button>
              <Link to="/form">Jump In</Link></Button>
          </VStack>
          
        </Center>
      </Box>
    </Container>
        
  )
}