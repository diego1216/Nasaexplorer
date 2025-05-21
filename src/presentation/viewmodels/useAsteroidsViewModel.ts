// src/presentation/viewmodels/useAsteroidsViewModel.ts
import { useEffect, useState } from "react";
import { neoService } from "../../data/datasources/neoService";

const getDate = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
};

export function useAsteroidsViewModel() {
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dayOffset, setDayOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadInitial = async () => {
    try {
      setLoading(true);
      const startDate = getDate(dayOffset + 3);
      const endDate = getDate(dayOffset);
      const data = await neoService.getAsteroids(startDate, endDate);
      setAsteroids(data);
      setDayOffset(prev => prev + 4);
    } catch {
      setError("Error al cargar los asteroides.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      const startDate = getDate(dayOffset + 3);
      const endDate = getDate(dayOffset);
      const data = await neoService.getAsteroids(startDate, endDate);
      setAsteroids(prev => [...prev, ...data]);
      setDayOffset(prev => prev + 4);
    } catch {
      setError("Error al cargar más asteroides.");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  return { asteroids, loading, error, loadMore, loadingMore };
}
