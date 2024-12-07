import { Report } from '../types/Report';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CRIME_TYPES } from '../constants/crimeTypes';

const statusText = {
  pending: 'Pendiente',
  investigating: 'En investigación',
  resolved: 'Resuelto'
};

export const exportToExcel = (reports: Report[]) => {
  const data = reports.map(report => ({
    'Fecha de Reporte': format(new Date(report.reportDate), "dd/MM/yyyy HH:mm", { locale: es }),
    'Fecha del Incidente': format(new Date(report.incidentDate), "dd/MM/yyyy HH:mm", { locale: es }),
    'Tipo de Delito': report.crimeType.type === 'otros' 
      ? `${CRIME_TYPES[report.crimeType.type]} - ${report.crimeType.otherDescription}`
      : CRIME_TYPES[report.crimeType.type],
    'Descripción': report.description,
    'Estado': statusText[report.status],
    'Denunciante': `${report.reporter.firstName} ${report.reporter.lastName}`,
    'Edad': report.reporter.age,
    'Teléfono': report.reporter.phone,
    'Latitud': report.location.lat,
    'Longitud': report.location.lng
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Reportes');
  
  XLSX.writeFile(wb, 'reportes-delitos.xlsx');
};

export const exportToPDF = (reports: Report[]) => {
  const doc = new jsPDF();

  const tableData = reports.map(report => [
    format(new Date(report.reportDate), "dd/MM/yyyy HH:mm", { locale: es }),
    format(new Date(report.incidentDate), "dd/MM/yyyy HH:mm", { locale: es }),
    report.crimeType.type === 'otros' 
      ? `${CRIME_TYPES[report.crimeType.type]} - ${report.crimeType.otherDescription}`
      : CRIME_TYPES[report.crimeType.type],
    report.description,
    statusText[report.status],
    `${report.reporter.firstName} ${report.reporter.lastName}`,
    report.reporter.age.toString(),
    report.reporter.phone,
    `${report.location.lat.toFixed(6)}, ${report.location.lng.toFixed(6)}`
  ]);

  doc.setFontSize(16);
  doc.text('Reporte de Delitos', 14, 15);
  doc.setFontSize(10);
  doc.text(`Generado el: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}`, 14, 22);

  autoTable(doc, {
    head: [['Fecha Reporte', 'Fecha Incidente', 'Tipo', 'Descripción', 'Estado', 'Denunciante', 'Edad', 'Teléfono', 'Ubicación']],
    body: tableData,
    startY: 25,
    styles: { fontSize: 8 },
    columnStyles: {
      3: { cellWidth: 40 },
      8: { cellWidth: 30 }
    }
  });

  doc.save('reportes-delitos.pdf');
};