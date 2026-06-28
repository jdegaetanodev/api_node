import * as informesServicio from '../servicios/informes.servicio.js';

export const descargarReportePDF = async (req, res) => {
  try {
    // Solicitamos el archivo ya procesado en formato buffer a la capa de servicio
    const pdfBuffer = await informesServicio.generarReportePDFBuffer();

    // Seteamos cabeceras HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-analitico-turnos.pdf');

    // Enviamos el buffer directamente
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.log(`Error generando el reporte PDF: ${error}`);
    if (!res.headersSent) {
      res.status(500).json({ estado: false, mensaje: 'Error interno al confeccionar el reporte PDF.' });
    }
  }
};