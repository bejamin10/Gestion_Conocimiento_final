export const CRIME_TYPES = {
  robo: 'Robo',
  robo_agravado: 'Robo agravado',
  hurto_simple: 'Hurto simple',
  hurto_agravado: 'Hurto agravado',
  apropiacion_indebida: 'Apropiación indebida',
  robo_vehiculo: 'Robo de vehículo',
  extorsion: 'Extorsión',
  estafa: 'Estafa',
  usurpacion: 'Usurpación',
  violacion_domicilio: 'Violación de domicilio',
  trafico_drogas: 'Tráfico ilícito de drogas',
  lesiones_personales: 'Lesiones personales',
  feminicidio: 'Feminicidio',
  homicidio: 'Homicidio',
  violacion_sexual: 'Violación sexual',
  secuestro: 'Secuestro',
  conduccion_ebriedad: 'Conducción en estado de ebriedad',
  danos_materiales: 'Daños materiales',
  violencia_familiar: 'Violencia familiar',
  corrupcion_funcionarios: 'Corrupción de funcionarios',
  otros: 'Otros'
} as const;

export type CrimeType = keyof typeof CRIME_TYPES;