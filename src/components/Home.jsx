import { Container } from "@chakra-ui/react"

import {
    Link
  } from "react-router-dom";

export function Home() {
    return (
        <Container>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/form">Form</Link>
            </li>
            </ul>
            <p>home!!</p>
        </Container>
        
    )
}