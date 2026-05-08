process.loadEnvFile(); // Cargar las variables del archivo .env

import express from "express";
import { pool } from "./db/conexion.js";

const app = express();

// Middleware
app.use(express.json()); // Sirve para parsear lo que recibo

// --- RUTAS DE ESPECIALIDADES ---

app.get('/especialidades', async (req, res, next) => { 
    try {
        const sql = `SELECT * FROM especialidades WHERE activo = 1`;
        const [especialidades] = await pool.query(sql);

        res.status(200).json({
            'estado': 'ok',
            'especialidades': especialidades
        });
    } catch (error) {
        next(error); // Delega al middleware global
    }    
});

app.get('/especialidades/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;
        const [especialidad] = await pool.execute(sql, [id]);

        if (especialidad.length === 0) {
            const err = new Error('Especialidad no encontrada');
            err.status = 404;
            throw err;
        }

        res.status(200).json({ 'estado': 'ok', 'especialidad': especialidad[0] });
    } catch (error) {
        next(error);
    }
});

// Ruta post con TRANSACCIÓN
app.post('/especialidades', async (req, res, next) => {
    // Pedimos una conexión exclusiva para la transacción
    const connection = await pool.getConnection(); 
    
    try {
        const { nombre } = req.body;
        
        if (!nombre) {
            const err = new Error('El nombre de la especialidad es requerido');
            err.status = 400;
            throw err;
        }

        // Aca empieza la transacción
        await connection.beginTransaction();

        const sql = `INSERT INTO especialidades (nombre) VALUES (?)`;
        const [resultado] = await connection.execute(sql, [nombre]);

        // Si fue exitosa, confirmamos los cambios
        await connection.commit();

        res.status(201).json({ 
            'estado': 'ok', 
            'mensaje': 'Especialidad creada con éxito', 
            'id': resultado.insertId 
        });

    } catch (error) {
        // Si falla, rollback de cualquier cambio pendiente
        await connection.rollback();
        next(error); 
    } finally {
        // Liberamos la conexión
        connection.release();
    }
});

app.put('/especialidades/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const { nombre } = req.body;

        const sql = `UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?`;
        const [resultado] = await pool.execute(sql, [nombre, id]);

        if (resultado.affectedRows === 0) {
            const err = new Error('No se encontró la especialidad a editar');
            err.status = 404;
            throw err;
        }

        res.status(200).json({ 'estado': 'ok', 'mensaje': 'Especialidad actualizada' });
    } catch (error) {
        next(error);
    }
});

app.delete('/especialidades/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const sql = `UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?`;
        
        const [resultado] = await pool.execute(sql, [id]);
        
        if (resultado.affectedRows === 0) {
            const err = new Error('No se encontró la especialidad para eliminar');
            err.status = 404;
            throw err;
        }

        res.status(200).json({ 'estado': 'ok', 'mensaje': 'Especialidad dada de baja' });
    } catch (error) {
        next(error);
    }
});

// Manejo de Errores (Middleware Centralizado)
app.use((err, req, res, next) => {
    console.error("Error capturado:", err.message);

    const statusCode = err.status || 500;
    const mensaje = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        estado: 'error',
        codigo: statusCode,
        mensaje: mensaje
    });
});

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});