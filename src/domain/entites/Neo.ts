export interface Neo {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  date: string; // Este campo lo puedes llenar manualmente desde la API por cada objeto.
}
