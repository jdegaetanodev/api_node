process.loadEnvFile();

import express from 'express';
import cors from 'cors'; // Es buena práctica invocarlo ya que está en las dependencias
import morgan from 'morgan';

import especialidadesRutas from './rutas/especialidades.rutas.js';
import obrasSocialesRutas from './rutas/obras_sociales.rutas.js';
import usuariosRutas from './rutas/usuarios.rutas.js';
import medicosRutas from './rutas/medicos.rutas.js';
import pacientesRutas from './rutas/pacientes.rutas.js';
import medicosObrasSocialesRutas from './rutas/medicosObrasSociales.rutas.js';
import turnosReservasRutas from './rutas/turnosReservas.rutas.js';
import authRutas from './rutas/auth.rutas.js';
import estadisticasRutas from './rutas/estadisticas.rutas.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Declaración de Endpoints Globales
app.use('/auth', authRutas);
app.use('/especialidades', especialidadesRutas);
app.use('/obras-sociales', obrasSocialesRutas);
app.use('/usuarios', usuariosRutas);
app.use('/medicos', medicosRutas);
app.use('/pacientes', pacientesRutas);
app.use('/medicos-obras-sociales', medicosObrasSocialesRutas);
app.use('/turnos-reservas', turnosReservasRutas);
app.use('/estadisticas', estadisticasRutas);

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});