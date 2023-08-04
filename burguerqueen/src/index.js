import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde "react-dom/client"
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un punto de análisis. Obtén más información: https://bit.ly/CRA-vitals
reportWebVitals();
