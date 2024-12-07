import { CrimeType } from '../constants/crimeTypes';

export interface Report {
  id: string;
  description: string;
  crimeType: {
    type: CrimeType;
    otherDescription?: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  incidentDate: string;
  reportDate: string;
  reporter: {
    firstName: string;
    lastName: string;
    age: number;
    phone: string;
  };
  status: 'pending' | 'investigating' | 'resolved';
}