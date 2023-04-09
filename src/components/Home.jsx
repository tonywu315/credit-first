import { Container, Box, Button, Image} from "@chakra-ui/react"
import "./Home.css"

import {
    Link
  } from "react-router-dom";

export function Home() {
  return (
    <Container>
      <Box position="absolute"
        left="0"
        top="0"
        width="100vw"
        height="1080px">
        <Image 
        boxSize='100px'
        objectFit='cover'
        position="absolute"
        top="10"
        left="10"
        src="./geometric.png" alt='Logo' 
        />
        <Box position="absolute"
        left="220"
        top="200"
        width="100vw"
        height="1080px">
          <h1>FINANCE YOUR FUTURE</h1>
          <Box position="absolute"
            left="0"
            top="140"
            width="45vw">
          <p> Whether you're looking to build credit, earn rewards, or save money, 
          <font color="#EC7955"> Credit First</font> has got your back. 
          No more confusion or stress when it comes to credit cards.  
  <br></br>Start your journey today!
          </p>
            <Button
            top = "70"
            size="lg"
            height = "57"
            width = "100"
            zIndex='999'
            bg = "#517FA2">
              <Link to="/form"><font size="30" color = "white"> Get Started</font></Link>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box position="absolute"
        top="0"
        right="0"
        width="100vw"
        height="1080px"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
        <Image 
          objectFit="cover"
          position="absolute"
          bottom="0"
          right="10"
          boxSize='700px'
          src="./credit_cards.png" alt='credit cards' />
      </Box>

    </Container>
        
  )
}