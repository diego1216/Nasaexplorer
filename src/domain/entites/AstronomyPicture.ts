// configuración para api APOD
export interface AstronomyPicture // se exporta la interfaz para poder usarla en otros archivos del proyecto
{
    date: string // la fecha en la que fue publicada la imagen o video (formato ISO: YYYY-MM-DD)
    title: string // el título de la imagen o video, proporcionado por la NASA
    explanation: string // explicación o descripción detallada del contenido proporcionada por la NASA
    url: string // la URL directa donde se puede ver la imagen o el video
    // string es el tipo de dato que representa una cadena de texto
    media_type: 'image' | 'video' // indica si el recurso multimedia es una imagen o un video
}
