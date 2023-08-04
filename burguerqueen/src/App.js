import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; 
import Administrador from './components/administrador';
import Cocinero from './components/cocinero';
import Mesero from './components/mesero';

const App = () => {
  return (
    <Router>
      <Routes> 
          <Route path="/" element={<Login/>} />
          <Route path="/administrador" element={<Administrador/>} />
          <Route path="/cocinero" element={<Cocinero/>} />
          <Route path="/mesero" element={<Mesero/>} />
      </Routes>
    </Router>
  );
};


export default App;

