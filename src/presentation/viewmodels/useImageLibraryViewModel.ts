import { useEffect, useState, useCallback } from 'react';
import { NasaMediaDatasource, NasaMediaItem } from '../../data/datasources/NasaMediaDatasource';

export const useImageLibraryViewModel = () => {
  const [images, setImages] = useState<NasaMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const datasource = new NasaMediaDatasource();

  const loadImages = useCallback(async (pageToLoad: number) => {
    try {
      if (pageToLoad === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await datasource.search('nasa', pageToLoad);

      // Si no hay resultados nuevos, detenemos
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setImages(prev =>
        pageToLoad === 1 ? data : [...prev, ...data]
      );
    } catch (e) {
      setError('Error al cargar las imágenes.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadImages(1);
  }, [loadImages]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadImages(nextPage);
    }
  };

  return { images, loading, error, loadMore, loadingMore };
};
