// configuración para api APOD
export interface AstronomyPicture //se exporta para que se pueda utilizar en otros archivos
{
    date: string // la fecha en la que fue públicada la imagen o video
    title: string // el título de la imagen
    explanation: string //explicación o datos de la imagen
    url: string //la url para ver directamente la imagen o video
    //string es una cadena de texto
    media_type: 'image' | 'video' //idica si el contenido es imagen o video
}