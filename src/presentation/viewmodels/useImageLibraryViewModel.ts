import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  fetchImages,
  resetLibrary,
  setPage,
} from '../../redux/slices/imageLibrarySlice';

export const useImageLibraryViewModel = () => {
  const dispatch = useAppDispatch();
  const {
    images,
    loading,
    loadingMore,
    error,
    hasMore,
    page,
  } = useAppSelector((state) => state.imageLibrary);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      dispatch(setPage(page + 1));
      dispatch(fetchImages());
    }
  };

  return { images, loading, error, loadMore, loadingMore };
};
