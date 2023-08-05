import React, { useState } from 'react';

const Desayuno = () => {
    
const [nombreUsuario, setNombreUsuario] = useState('');
  console.log(nombreUsuario)
    return (
    <div>
    <div>
      
      <input
        type="text"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
      />
    </div>
  </div>
);
};
 
export default Desayuno;

