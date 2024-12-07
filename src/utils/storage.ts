import { Report } from '../types/Report';

export const saveReport = (report: Report): void => {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem('reports', JSON.stringify(reports));
};

export const getReports = (): Report[] => {
  const reports = localStorage.getItem('reports');
  return reports ? JSON.parse(reports) : [];
};