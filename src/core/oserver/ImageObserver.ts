// src/core/observer/ImageObserver.ts

export interface ImageObserver {
  onImageViewed(imageId: string): void;
}

export class ImageSubject {
  private observers: ImageObserver[] = [];

  subscribe(observer: ImageObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: ImageObserver) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(imageId: string) {
    this.observers.forEach(observer => observer.onImageViewed(imageId));
  }
}
