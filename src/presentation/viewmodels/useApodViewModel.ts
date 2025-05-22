import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApod } from '../../redux/slices/apodSlice';
import { RootState } from '../../redux/store';

const useApodViewModel = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.apod);

  useEffect(() => {
    dispatch(fetchApod() as any);
  }, []);

  return { data, loading, error };
};

export default useApodViewModel;
