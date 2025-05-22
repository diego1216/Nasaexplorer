// src/presentation/viewmodels/useEonetViewModel.ts

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchEonetEvents, increaseLimit } from "../../redux/slices/eonetSlice";

export const useEonetViewModel = () => {
  const dispatch = useAppDispatch();
  const { data: events, loading, error, limit, loadingMore } = useAppSelector(
    (state) => state.eonet
  );

  useEffect(() => {
    dispatch(fetchEonetEvents(limit));
  }, [limit]);

  const loadMore = () => {
    if (!loadingMore) {
      dispatch(increaseLimit()); // aumenta el límite en el slice
    }
  };

  return {
    events,
    loading,
    error,
    loadMore,
    loadingMore,
  };
};
