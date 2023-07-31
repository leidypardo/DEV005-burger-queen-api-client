import React, { useState } from 'react';
import axios from 'axios'; //solicitudes HTTP

const MyComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

  const handleLogin = async () => {
    const url = 'http://localhost:8080/login';
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.data) {
        console.log(response.data.accessToken);
        setResponse(response.data);
      } else {
        console.error('Respuesta del servidor en un formato inesperado:', response.data);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data)
    }
    
  };

  return (
    <div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default MyComponent;
