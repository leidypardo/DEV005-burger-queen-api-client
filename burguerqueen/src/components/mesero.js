import React from 'react';
import { useNavigate } from 'react-router-dom';


const Mesero = () => {
const navigate = useNavigate();
const desayuno =  async () => { navigate('/desayuno')}
const almuerzo =   async () => {navigate('/almuerzo')}

  

  return (
    <div>
      <button onClick={desayuno}>Menu Desayuno</button>
      <button onClick={almuerzo}>Menu Almuerzo</button>
    </div>
  );
};

export default Mesero; 
