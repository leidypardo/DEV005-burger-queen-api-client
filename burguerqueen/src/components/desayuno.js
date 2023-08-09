import React, { useState } from 'react';
import axios from 'axios'; // solicitudes HTTP
import { token } from './login';

const Desayuno = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [response, setResponse] = useState(null);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  let now = new Date();
  // Formatear el timestamp en el formato deseado
  let  timeorder = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  //ver productos
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

  //cuando se hace click en el producto
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

  // Filtrar productos de tipo "Desayuno"
  const productosDesayuno = productos.filter((producto) => producto.type === 'Desayuno');

  // Calcular el total del precio de los productos seleccionados
  const totalPrecio = productosSeleccionados.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  //crear order
  const createOrder = async () => {
    const url = 'http://localhost:8080/orders';
    const productsForOrder = productosSeleccionados.map((producto) => ({
      qty: producto.cantidad,
      product: {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        image: producto.image,
        type: producto.type,
        dataEntry: producto.dataEntry,
      },
    }));
  
    const data = {
      userId: idUsuario,
      client: nombreUsuario,
      products: productsForOrder,
      status: "pending",
      dataEntry: timeorder,
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
  
      if (response.data) {
        setResponse(response.data);
        alert('Orden creada con éxito! El ID asignado es: ' + response.data.id);
        setNombreUsuario("");
        setIdUsuario("");
        setProductosSeleccionados([]);
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
        <div>
          <h2>Datos del Usuario:</h2>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
         </div>
         <div>
          <input
            type="text"
            value={idUsuario}
            onChange={(e) => setIdUsuario(e.target.value)}
          />
        </div>
        <div>
        {nombreUsuario && (
          <div>
            <h3>Nombre del Usuario:</h3>
            <p>{nombreUsuario}</p>
            <p>{idUsuario}</p>
          </div>
        )}
      </div>
        <button onClick={seeProducts}> ver menu </button>
      </div>
      <div>
        <h2>Menu:</h2>
        {productosDesayuno.map((producto, index) => (
          <React.Fragment key={index}>
            <button onClick={() => handleProductoClick(producto)}>
              {producto.name}...........{producto.price}
            </button>
            <br />
          </React.Fragment>
        ))}
      </div>
      
      <div>
        <h3>Productos Seleccionados:</h3>
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
      <div>
        <h2>Total Precio: {totalPrecio}</h2>
      </div>
      <div>
      <button onClick={() => createOrder()}>
              crear orden
            </button>
      </div>

    </div>
  );
};


export default Desayuno;