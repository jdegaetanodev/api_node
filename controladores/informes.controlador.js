import PDFDocument from 'pdfkit';
import * as informesServicio from '../servicios/informes.servicio.js';

export const descargarReportePDF = async (req, res) => {
  try {

    const turnos = await informesServicio.obtenerDetalleTurnosPDF();
    const metricas = await informesServicio.obtenerMetricasConsolidadas();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-analitico-turnos.pdf');

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res); 

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
      const estado = turno.atentido === 1 ? 'Atendido' : 'Pendiente';

      // Bloque principal del turno
      doc.fontSize(10).fillColor('#2d3748').text(
        `${index + 1}. Fecha: ${fecha} | Paciente: ${turno.paciente_apellido} (DNI: ${turno.paciente_doc})`
      );
      
      // Sub-datos del turno con el valor_total calculado de la regla de negocio
      doc.fontSize(9).fillColor('#4a5568').text(
        `   Médico: Dr/a. ${turno.medico_apellido} | Cobertura: ${turno.obra_social} | Total a Cobrar: $${turno.valor_total} | Estado: ${estado}`
      );
      doc.moveDown(0.6);

      // Para evitar que desborde de pagina
      if (doc.y > 700) doc.addPage();
    });

    doc.end(); // Cerramos el documento
  } catch (error) {
    console.log(`Error generando el reporte PDF: ${error}`);
    if (!res.headersSent) {
      res.status(500).json({ estado: false, mensaje: 'Error interno al confeccionar el reporte PDF.' });
    }
  }
};