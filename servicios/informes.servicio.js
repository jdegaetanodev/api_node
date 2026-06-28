import { pool } from '../db/conexion.js';
import PDFDocument from 'pdfkit'; 

// 1. Obtener la información de los turnos activos para el listado del PDF
export const obtenerDetalleTurnosPDF = async () => {
  const [filas] = await pool.query(`
    SELECT tr.id_turno_reserva, tr.fecha_hora, tr.valor_total, tr.atendido,
           u_med.apellido AS medico_apellido, os.nombre AS obra_social,
           u_pac.apellido AS paciente_apellido, u_pac.documento AS paciente_doc
    FROM turnos_reservas tr
    JOIN medicos m ON tr.id_medico = m.id_medico
    JOIN usuarios u_med ON m.id_usuario = u_med.id_usuario
    JOIN pacientes p ON tr.id_paciente = p.id_paciente
    JOIN usuarios u_pac ON p.id_usuario = u_pac.id_usuario
    JOIN obras_sociales os ON tr.id_obra_social = os.id_obra_social
    WHERE tr.activo = 1
    ORDER BY tr.fecha_hora DESC
  `);
  return filas;
};

// 2. Obtener los totales agrupados para el bloque de métricas globales del informe
export const obtenerMetricasConsolidadas = async () => {
  const [totales] = await pool.query(`
    SELECT 
      COUNT(tr.id_turno_reserva) AS total_turnos,
      COUNT(DISTINCT tr.id_paciente) AS total_pacientes
    FROM turnos_reservas tr
    WHERE tr.activo = 1
  `);

  const [porObraSocial] = await pool.query(`
    SELECT os.nombre AS obra_social, COUNT(tr.id_turno_reserva) AS cantidad
    FROM obras_sociales os
    LEFT JOIN turnos_reservas tr ON os.id_obra_social = tr.id_obra_social AND tr.activo = 1
    WHERE os.activo = 1
    GROUP BY os.id_obra_social, os.nombre
  `);

  return {
    globales: totales[0],
    coberturas: porObraSocial
  };
};

// 3. Generar el PDF
export const generarReportePDFBuffer = async () => {
  const turnos = await obtenerDetalleTurnosPDF();
  const metricas = await obtenerMetricasConsolidadas();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', (err) => reject(err));

    // --- ENCABEZADO ---
    doc.fontSize(20).fillColor('#1a365d').text('CLÍNICA MÉDICA', { align: 'center', bold: true });
    doc.fontSize(14).fillColor('#2d3748').text('Informe Estadístico y Analítico de Turnos', { align: 'center' });
    doc.moveDown(0.2);
    doc.fontSize(9).fillColor('#718096').text(`Generado el: ${new Date().toLocaleString('es-AR')}`, { align: 'center' });
    doc.moveDown(1.5);

    // --- SECCIÓN 1: RESUMEN GENERAL ---
    doc.fontSize(12).fillColor('#1a365d').text('1. Resumen de Métricas Globales', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#2d3748')
       .text(`• Cantidad Total de Turnos Registrados: ${metricas.globales.total_turnos}`)
       .text(`• Cantidad de Pacientes Únicos Atendidos: ${metricas.globales.total_pacientes}`);
    doc.moveDown(1);

    // --- SECCIÓN 2: APERTURA POR OBRA SOCIAL ---
    doc.fontSize(12).fillColor('#1a365d').text('2. Distribución por Obras Sociales', { underline: true });
    doc.moveDown(0.5);
    
    metricas.coberturas.forEach(cobertura => {
      doc.fontSize(10).fillColor('#2d3748').text(`• ${cobertura.obra_social}: ${cobertura.cantidad} turnos asignados.`);
    });
    doc.moveDown(1.5);

    // --- SECCIÓN 3: DETALLE DE TURNOS ---
    doc.fontSize(12).fillColor('#1a365d').text('3. Desglose Detallado de Reservas Activas', { underline: true });
    doc.moveDown(1);

    turnos.forEach((turno, index) => {
      const fecha = new Date(turno.fecha_hora).toLocaleString('es-AR');
      const estado = turno.atendido === 1 ? 'Atendido' : 'Pendiente';

      doc.fontSize(10).fillColor('#2d3748').text(
        `${index + 1}. Fecha: ${fecha} | Paciente: ${turno.paciente_apellido} (DNI: ${turno.paciente_doc})`
      );
      
      doc.fontSize(9).fillColor('#4a5568').text(
        `   Médico: Dr/a. ${turno.medico_apellido} | Cobertura: ${turno.obra_social} | Total a Cobrar: $${turno.valor_total} | Estado: ${estado}`
      );
      doc.moveDown(0.6);

      if (doc.y > 700) doc.addPage();
    });

    doc.end();
  });
};