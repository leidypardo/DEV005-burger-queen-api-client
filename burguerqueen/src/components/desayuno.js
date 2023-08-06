import React, { useState } from 'react';
import axios from 'axios'; // solicitudes HTTP
import { token } from './login';

const Desayuno = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [response, setResponse] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const seeProducts = async () => {
    const url = 'http://localhost:8080/products';

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (response.data) {
        setResponse(response.data);
        setProductos(response.data);
      } else {
        console.error('Respuesta del servidor en un formato inesperado:', response.data);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const handleProductoClick = (producto) => {
    setProductosSeleccionados([...productosSeleccionados, producto]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
      </div>
      <div>
        <button onClick={seeProducts}>ver</button>
      </div>
      <div>
        {productos.map((producto, index) => (
          <React.Fragment key={index}>
            <button onClick={() => handleProductoClick(producto)}>
              {producto.name}...........{producto.price}
            </button>
            <br />
          </React.Fragment>
        ))}
      </div>
      <div>
        <h2>Productos Seleccionados:</h2>
        {productosSeleccionados.map((producto, index) => (
          <div key={index}>
            <p>Nombre: {producto.name}</p>
            <p>Precio: {producto.price}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desayuno;
