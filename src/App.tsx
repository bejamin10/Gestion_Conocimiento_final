import React, { useState, useEffect } from 'react';
import { Report } from './types/Report';
import { getReports } from './utils/storage';
import Map from './components/Map';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import { Shield } from 'lucide-react';

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleReportSubmitted = () => {
    setReports(getReports());
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Denuncias - Cercado de Lima</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Map
              reports={reports}
              onLocationSelect={setSelectedLocation}
            />
            <ReportList reports={reports} />
          </div>
          
          <div className="lg:sticky lg:top-6 h-fit">
            <ReportForm
              selectedLocation={selectedLocation}
              onReportSubmitted={handleReportSubmitted}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;