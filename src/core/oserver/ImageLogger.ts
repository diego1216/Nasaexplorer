import { ImageObserver } from './ImageObserver';

export class ImageLogger implements ImageObserver {
  onImageViewed(imageId: string): void {
    console.log(`🛰️ Imagen visualizada con ID: ${imageId}`);
  }
}
