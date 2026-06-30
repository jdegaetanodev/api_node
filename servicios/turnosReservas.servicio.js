import { pool } from '../db/conexion.js';
import * as turnosRepositorio from '../repositorios/turnosReservas.repositorio.js';

export const obtenerTodos = async () =>
  turnosRepositorio.encontrarTodos();

export const obtenerUno = async (id) =>
  turnosRepositorio.encontrarUno(id);

export const obtenerPorMedico = async (id_usuario) =>
  turnosRepositorio.encontrarPorMedico(id_usuario);

export const obtenerPorPaciente = async (id_usuario) =>
  turnosRepositorio.encontrarPorPaciente(id_usuario);

export const marcarAtendido = async (id) =>
  turnosRepositorio.marcarAtendido(id);

export const crearConTransaccion = async ({
  id_medico, id_paciente, id_obra_social, fecha_hora, atendido,
}) => {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();

    const [medicoFilas] = await turnosRepositorio.obtenerMedico(conexion, id_medico);
    if (!medicoFilas.length) throw new Error('MEDICO_NOT_FOUND');
    const valorConsulta = parseFloat(medicoFilas[0].valor_consulta);

    const [osFilas] = await turnosRepositorio.obtenerObraSocial(conexion, id_obra_social);
    if (!osFilas.length) throw new Error('OS_NOT_FOUND');

    const { es_particular, porcentaje_descuento } = osFilas[0];

    let valorTotal = valorConsulta;
    if (es_particular === 0) {
      const descuento = valorConsulta * (parseFloat(porcentaje_descuento) / 100);
      valorTotal = valorConsulta - descuento;
    }

    const [resultado] = await turnosRepositorio.insertar(
      conexion, id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal, atendido
    );

    await conexion.commit();
    return resultado;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    conexion.release();
  }
};

export const actualizar = async (dto, id) =>
  turnosRepositorio.actualizar(dto, id);

export const eliminar = async (id) =>
  turnosRepositorio.eliminar(id);