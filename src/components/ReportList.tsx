import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Report } from '../types/Report';
import { AlertCircle, Clock, CheckCircle, Download } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../utils/export';
import { CRIME_TYPES } from '../constants/crimeTypes';

interface ReportListProps {
  reports: Report[];
}

const statusIcons = {
  pending: <AlertCircle className="w-5 h-5 text-yellow-500" />,
  investigating: <Clock className="w-5 h-5 text-blue-500" />,
  resolved: <CheckCircle className="w-5 h-5 text-green-500" />
};

const statusText = {
  pending: 'Pendiente',
  investigating: 'En investigación',
  resolved: 'Resuelto'
};

export default function ReportList({ reports }: ReportListProps) {
  const handleExportExcel = () => {
    exportToExcel(reports);
  };

  const handleExportPDF = () => {
    exportToPDF(reports);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Reportes Recientes</h2>
        {reports.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {reports.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay reportes registrados</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {report.reporter.firstName} {report.reporter.lastName}
                  </span>
                  <div className="text-sm text-gray-600">
                    Reportado el: {format(new Date(report.reportDate), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                  </div>
                  <div className="text-sm text-gray-600">
                    Incidente ocurrido el: {format(new Date(report.incidentDate), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {statusIcons[report.status]}
                  <span className="text-sm font-medium">{statusText[report.status]}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-blue-600">
                  Tipo de delito: {CRIME_TYPES[report.crimeType.type]}
                  {report.crimeType.type === 'otros' && ` - ${report.crimeType.otherDescription}`}
                </span>
              </div>
              <p className="text-gray-800">{report.description}</p>
              <div className="mt-2 text-sm text-gray-600">
                Ubicación: {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}