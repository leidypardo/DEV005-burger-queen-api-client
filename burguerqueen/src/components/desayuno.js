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
    const productoExistente = productosSeleccionados.find((p) => p.id === producto.id);

    if (productoExistente) {
      const nuevosProductosSeleccionados = productosSeleccionados.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setProductosSeleccionados(nuevosProductosSeleccionados);
    } else {
      setProductosSeleccionados([...productosSeleccionados, { ...producto, cantidad: 1 }]);
    }
  };

  const handleEliminarProducto = (productoId) => {
    const nuevosProductosSeleccionados = productosSeleccionados.map((producto) =>
      producto.id === productoId
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    ).filter((producto) => producto.cantidad > 0);
    setProductosSeleccionados(nuevosProductosSeleccionados);
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
        {productosSeleccionados.map((producto) => (
          <div key={producto.id}>
            <p>Nombre: {producto.name}</p>
            <p>Precio: {producto.price}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <button onClick={() => handleEliminarProducto(producto.id)}>
              Eliminar
            </button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desayuno;
