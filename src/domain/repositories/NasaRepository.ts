import { AstronomyPicture } from "../entites/AstronomyPicture";
//se llama al archivo AstronomyPicture para que este pueda ser usado dentro del archivo
export interface NasaRepository
// se exporta el archivo para que estepueda ser usado
{
    getAstronomyPicture(): Promise<AstronomyPicture[]> //promete que dará el archivo multimedia cuando este lista
    
}