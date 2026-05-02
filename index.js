process.loadEnvFile(); // Cargar las variables del archivo .env

import  express  from "express";
import { pool } from "./db/conexion.js";

const app = express();

// Middleware
app.use(express.json()); // Sirve para parsear lo que recibo

// Rutas de especialidades

app.get('/especialidades', async (req, res) => { // Retorna todas las especialidades activas
    
    try {
        const sql = `SELECT * FROM especialidades WHERE activo = 1`;
        
        const [especialidades] = await pool.query(sql);

        res.status(200).json({
            'estado': 'ok',
            'especialidades': especialidades
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }    
});


app.get('/especialidades/:id', async (req, res) => { // Retorna UNA especialidad por ID
    try {

        const id = req.params.id; 
        const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidad] = await pool.execute(sql, [id]); // Uso execute en lugar de query por el parámetro externo

        if (especialidad.length === 0) {
            return res.status(404).json({ 'estado': 'error', 'mensaje': 'Especialidad no encontrada' });
        }

        res.status(200).json({ 'estado': 'ok', 'especialidad': especialidad[0] });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

app.post('/especialidades', async (req, res) => { // Crear una nueva especialidad
    try {
        const { nombre } = req.body; // Extraemos el nombre del JSON recibido

        const sql = `INSERT INTO especialidades (nombre) VALUES (?)`;
        const [resultado] = await pool.execute(sql, [nombre]);

        res.status(201).json({ 
            'estado': 'ok', 
            'mensaje': 'Especialidad creada', 
            'id': resultado.insertId 
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});


app.put('/especialidades/:id', async (req, res) => { // Actualizar una especialidad
    try {
        const id = req.params.id;
        const { nombre } = req.body;

        const sql = `UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?`;
        const [resultado] = await pool.execute(sql, [nombre, id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ 'estado': 'error', 'mensaje': 'No se encontró la especialidad a editar' });
        }

        res.status(200).json({ 'estado': 'ok', 'mensaje': 'Especialidad actualizada' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'estado': 'error', 'mensaje': 'Error al actualizar' });
    }
});

app.delete('/especialidades/:id', async (req, res) => { // DELETE - Eliminación lógica
    try {
        const id = req.params.id;
        const sql = `UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?`;
        
        await pool.execute(sql, [id]);
        
        res.status(200).json({ 'estado': 'ok', 'mensaje': 'Especialidad dada de baja' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar');
    }
});



const PUERTO = process.env.PUERTO;

// Puerto del server
app.listen(PUERTO || 3000,() => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});