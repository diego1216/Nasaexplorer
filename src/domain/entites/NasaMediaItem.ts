export interface NasaMediaItem { // Se exporta la interfaz para que pueda ser utilizada en otras partes del proyecto
  title: string; // Título del recurso multimedia (imagen) obtenido de la API de la NASA
  description: string; // Descripción o resumen del contenido multimedia
  imageUrl: string; // URL directa donde se encuentra la imagen
}
