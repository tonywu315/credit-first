import "./App.css";

import { ChakraProvider, Text, Box } from "@chakra-ui/react";

import { Home } from "./components/Home";
import { Form } from "./components/Form";
import { About } from "./components/About";
import { Recommend } from "./components/Recommend";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <ChakraProvider>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/form" element={<Form />} />
                    <Route exact path="/about" element={<About />} />
                    <Route
                        path="/recommend/:userData"
                        element={<Recommend />}
                    />
                </Routes>
            </ChakraProvider>
        </Router>
    );
};

export default App;
