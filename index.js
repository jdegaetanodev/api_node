process.loadEnvFile(); // Cargar las variables del archivo .env


import express from 'express';
import especialidadesRutas from './rutas/especialidades.rutas.js';

const app = express();

app.use(express.json());
app.use('/especialidades', especialidadesRutas);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});