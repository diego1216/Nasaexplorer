import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonkiEvents } from '../../redux/slices/donkiSlice';
import type { RootState, AppDispatch } from '../../redux/store';

export const useDonkiViewModel = (startDate: string, endDate: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector((state: RootState) => state.donki);

  useEffect(() => {
    dispatch(fetchDonkiEvents({ startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  return { events, loading, error };
};
