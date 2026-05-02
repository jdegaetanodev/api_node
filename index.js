import express from "express";
import { pool } from "./db/conexion.js";
import { textConexion } from "./db/text-conexion.js";

const app = express();

// TEST BASE DE DATOS
await testConexion();

// Middleware
app.use(express.json()); // Sirve para parsear lo que recibo

app.get('/', (req, res) => {
    console.log("Test Get");
    res.status(200).send({'estado':'ok','msg':'Creado'});
})

app.post('/especialidades', (req, res) => {
    console.log("Test Post");

    console.log(req.body.nombre);
    //res.status(200).send({'estado':'ok','msg':'API OK'});
})

app.get('/especialidades', async (req, res) => {

    try{
        const ccc = req.params.id_especialidades;

        const sql = `SELECT * FROM especialidades WHERE activo=1 AND id_especialidad = ?`;


        //const [especialidades, fields] = await pool.query(sql);
        const [especialidades, fields] = await pool.execute(sql, [ccc]);

        res.status(200).send({'estado':'ok','especialidades':especialidades});


    } catch(error) {
        console.log(error);
    }

})



// Cargar las variables del archivo .env
process.loadEnvFile();
const PUERTO = process.env.PUERTO;

// Puerto del server
app.listen(PUERTO || 3000,() => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});

