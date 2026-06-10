process.loadEnvFile();

import express from 'express';
import especialidadesRutas from './rutas/especialidades.rutas.js';
import obrasSocialesRutas from './rutas/obras_sociales.rutas.js';

const app = express();

app.use(express.json());
app.use('/especialidades', especialidadesRutas);
app.use('/obras-sociales', obrasSocialesRutas);

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});