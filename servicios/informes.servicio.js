import PDFDocument from 'pdfkit';
import * as informesRepositorio from '../repositorios/informes.repositorio.js';

export const obtenerDetalleTurnosPDF = async () => {
  const [filas] = await informesRepositorio.obtenerDetalleTurnos();
  return filas;
};

export const obtenerMetricasConsolidadas = async () =>
  informesRepositorio.obtenerMetricas();

export const generarReportePDFBuffer = async () => {
  const turnos = await obtenerDetalleTurnosPDF();
  const metricas = await obtenerMetricasConsolidadas();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', (err) => reject(err));

    doc.fontSize(20).fillColor('#1a365d').text('CLÍNICA MÉDICA', { align: 'center', bold: true });
    doc.fontSize(14).fillColor('#2d3748').text('Informe Estadístico y Analítico de Turnos', { align: 'center' });
    doc.moveDown(0.2);
    doc.fontSize(9).fillColor('#718096').text(`Generado el: ${new Date().toLocaleString('es-AR')}`, { align: 'center' });
    doc.moveDown(1.5);

    doc.fontSize(12).fillColor('#1a365d').text('1. Resumen de Métricas Globales', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#2d3748')
       .text(`• Cantidad Total de Turnos Registrados: ${metricas.globales.total_turnos}`)
       .text(`• Cantidad de Pacientes Únicos Atendidos: ${metricas.globales.total_pacientes}`);
    doc.moveDown(1);

    doc.fontSize(12).fillColor('#1a365d').text('2. Distribución por Obras Sociales', { underline: true });
    doc.moveDown(0.5);
    metricas.coberturas.forEach(cobertura => {
      doc.fontSize(10).fillColor('#2d3748').text(`• ${cobertura.obra_social}: ${cobertura.cantidad} turnos asignados.`);
    });
    doc.moveDown(1.5);

    doc.fontSize(12).fillColor('#1a365d').text('3. Desglose Detallado de Reservas Activas', { underline: true });
    doc.moveDown(1);

    turnos.forEach((turno, index) => {
      const fecha = new Date(turno.fecha_hora).toLocaleString('es-AR');
      const estado = turno.atendido === 1 ? 'Atendido' : 'Pendiente';

      doc.fontSize(10).fillColor('#2d3748').text(
        `${index + 1}. Fecha: ${fecha} | Paciente: ${turno.paciente_apellido} (DNI: ${turno.paciente_doc})`
      );
      doc.fontSize(9).fillColor('#4a5568').text(
        `   Médico: Dr/a. ${turno.medico_apellido} | Cobertura: ${turno.obra_social} | Total: $${turno.valor_total} | Estado: ${estado}`
      );
      doc.moveDown(0.6);
      if (doc.y > 700) doc.addPage();
    });

    doc.end();
  });
};