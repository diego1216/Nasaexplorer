// src/presentation/viewmodels/useAsteroidsViewModel.ts
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchAsteroids, resetNeos } from "../../redux/slices/neoSlice";

const getDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
};

export function useAsteroidsViewModel() {
  const dispatch = useAppDispatch();
  const { data: asteroids, loading, error } = useAppSelector((state) => state.neo);

  const [dayOffset, setDayOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadInitial = async () => {
    dispatch(resetNeos());
    const startDate = getDate(dayOffset + 3);
    const endDate = getDate(dayOffset);
    await dispatch(fetchAsteroids({ startDate, endDate }));
    setDayOffset((prev) => prev + 4);
  };

  const loadMore = async () => {
    if (loadingMore || loading) return;

    setLoadingMore(true);
    const startDate = getDate(dayOffset + 3);
    const endDate = getDate(dayOffset);
    await dispatch(fetchAsteroids({ startDate, endDate }));
    setDayOffset((prev) => prev + 4);
    setLoadingMore(false);
  };

  useEffect(() => {
    loadInitial();
  }, []);

  return {
    asteroids,
    loading,
    error,
    loadMore,
    loadingMore,
  };
}
