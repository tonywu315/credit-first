import './App.css';

import { ChakraProvider, Text, Box } from '@chakra-ui/react';

import { Home } from './components/Home'
import { Form } from './components/Form';
import { Recommend } from './components/Recommend';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/form" element={<Form/>}/>
          <Route path="/recommend/:userData" element={<Recommend/>}/>
        </Routes>
      </ChakraProvider>
    </Router>
    
  );
}

export default App;
