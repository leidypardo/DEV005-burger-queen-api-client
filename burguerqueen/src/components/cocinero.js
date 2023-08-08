import React, { useState } from 'react';
import { token } from './login'; 
import axios from 'axios';

const Cocinero = () => {
  const [response, setResponse] = useState(null);

  const seeOrders = async () => {
    const url = 'http://localhost:8080/orders';

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (response.data) {
        setResponse(response.data);
        console.log(response.data);
      } else {
        console.error('Respuesta del servidor en un formato inesperado:', response.data);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <div>
        <button onClick={seeOrders}>Ver Orden</button>
      </div>
      {response && (
        <div>
          <h2>Ordenes:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Cocinero;
