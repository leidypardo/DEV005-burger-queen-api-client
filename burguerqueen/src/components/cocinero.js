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
      <div>
        <h2>Ordenes:</h2>
        {response && Array.isArray(response) ? (
          response.map(order => (
            <div key={order.id}>
              <h3>Orden ID: {order.id}</h3>
              <p>Cliente: {order.client}</p>
              <p>Estado: {order.status}</p>
              <p>Fecha de entrada: {order.dataEntry}</p>
              {order.products && Array.isArray(order.products) && (
                order.products.map(product => (
                  <div key={product.product.id}>
                    <h4>Producto: {product.product.name}</h4>
                    <p>Cantidad: {product.qty}</p>
                    {/* Mostrar más detalles del producto si es necesario */}
                  </div>
                ))
              )}
            </div>
          ))
        ) : (
          <p>Aún no se han cargado las órdenes.</p>
        )}
      </div>
    </div>
  );
};

export default Cocinero;