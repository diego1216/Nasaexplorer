export interface Neo { // Se exporta la interfaz Neo para que pueda ser utilizada en otras partes del proyecto
  id: string; // Identificador único del asteroide proporcionado por la NASA
  name: string; // Nombre del asteroide
  absolute_magnitude_h: number; // Magnitud absoluta (brillo) del asteroide
  is_potentially_hazardous_asteroid: boolean; // Indica si el asteroide es potencialmente peligroso para la Tierra
  date: string; // Fecha de observación o detección, que se asigna manualmente desde la API por cada objeto
}
