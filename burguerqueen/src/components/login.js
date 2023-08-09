import React, { useState } from 'react';
import axios from 'axios'; //solicitudes HTTP
import { useNavigate } from 'react-router-dom';
import imagen from '../imagenes/imagen.png';
import iconoPassword from '../imagenes/iconoContraseña.png';
import iconoCorreo from '../imagenes/iconoCorreo.png';
import '../App.css'; 

export let token = '';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
      const url = 'http://localhost:8080/login';
      const data = {
        email: email,
        password: password,
      };
  
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          },
        });
      
        if (response.data) {
          console.log(response.data.user.role); 
          setResponse(response.data);
         token = response.data.accessToken;
      
          if (response.data.user.role === "mesero") {
            navigate('/mesero')
          }
          if (response.data.user.role === "administrador") {
            navigate('/administrador')
          }
          if (response.data.user.role === "cocinero") {
            navigate('/cocinero')
          }
        } else {
          console.error('Respuesta del servidor en un formato inesperado:', response.data);
        }
      } catch (error) {
        console.error(error);
        alert(error.response.data)
      }
      
    };
    return (

      <div className="ipad-pro">
              <div className="overlap-group-wrapper">
                  <div className="overlap-group">
                      <div className="cuadro-decorativo" />
                      <div className="cuadro-correo cuadro-correo-centrado">
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo electrónico"
                          style={{ textAlign: "center" }}  // Centra el texto horizontalmente
                        />
                      </div>


                      
                      <div className="cuadro-contrasea cuadro-contrasea-centrado">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="************"
                          style={{ textAlign: "center" }}  // Centra el texto horizontalmente
                        />
                      </div>
                      <div className="boton-login-texto" onClick={handleLogin}>
                        Iniciar sesión
                      </div>
                      <img className="imagen" alt="Imagen" src={imagen} />
                      <img className="icono-correo" alt="Icono correo" src={iconoCorreo} />
                      <img className="icono-contrasea" alt="Icono contrasea" src={iconoPassword} />
                  </div>
              </div>
          </div>

     
    );
  };
  export default Login;