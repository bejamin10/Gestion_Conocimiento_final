import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Report } from '../types/Report';
import { saveReport } from '../utils/storage';
import { CRIME_TYPES, CrimeType } from '../constants/crimeTypes';

interface ReportFormProps {
  selectedLocation: { lat: number; lng: number } | null;
  onReportSubmitted: () => void;
}

export default function ReportForm({ selectedLocation, onReportSubmitted }: ReportFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    description: '',
    incidentDate: '',
    incidentTime: '',
    crimeType: 'robo' as CrimeType,
    otherCrimeType: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert('Por favor seleccione una ubicación en el mapa');
      return;
    }

    const report: Report = {
      id: Date.now().toString(),
      description: formData.description,
      crimeType: {
        type: formData.crimeType,
        ...(formData.crimeType === 'otros' && { otherDescription: formData.otherCrimeType })
      },
      location: selectedLocation,
      incidentDate: `${formData.incidentDate}T${formData.incidentTime}:00`,
      reportDate: new Date().toISOString(),
      reporter: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        phone: formData.phone
      },
      status: 'pending'
    };

    saveReport(report);
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      phone: '',
      description: '',
      incidentDate: '',
      incidentTime: '',
      crimeType: 'robo',
      otherCrimeType: ''
    });
    onReportSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Reportar Delito</h2>
      
      {/* Datos del Denunciante */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Datos del Denunciante</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              Nombres
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Apellidos
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="120"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{9}"
              placeholder="912345678"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Datos del Incidente */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Datos del Incidente</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="incidentDate" className="block text-gray-700 text-sm font-bold mb-2">
              Fecha del Incidente
            </label>
            <input
              type="date"
              id="incidentDate"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="incidentTime" className="block text-gray-700 text-sm font-bold mb-2">
              Hora del Incidente
            </label>
            <input
              type="time"
              id="incidentTime"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="crimeType" className="block text-gray-700 text-sm font-bold mb-2">
            Tipo de Delito
          </label>
          <select
            id="crimeType"
            name="crimeType"
            value={formData.crimeType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {Object.entries(CRIME_TYPES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {formData.crimeType === 'otros' && (
          <div className="mb-4">
            <label htmlFor="otherCrimeType" className="block text-gray-700 text-sm font-bold mb-2">
              Especifique el tipo de delito
            </label>
            <input
              type="text"
              id="otherCrimeType"
              name="otherCrimeType"
              value={formData.otherCrimeType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ubicación del Incidente
          </label>
          <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
            <MapPin className="w-5 h-5 mr-2" />
            {selectedLocation ? (
              <span>
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </span>
            ) : (
              <span className="text-red-500">
                Por favor seleccione una ubicación en el mapa
              </span>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Descripción del Incidente
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
            placeholder="Describa el incidente con el mayor detalle posible..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Enviar Reporte
      </button>
    </form>
  );
}