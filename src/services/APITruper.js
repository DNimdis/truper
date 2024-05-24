import axios from 'axios';

// Crea una instancia de axios con la configuración base
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // Reemplaza con la URL base de tu API
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;