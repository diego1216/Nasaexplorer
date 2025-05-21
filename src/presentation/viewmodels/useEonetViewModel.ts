// src/presentation/viewmodels/useEonetViewModel.ts

import { useEffect, useState } from "react";
import { eonetRepository } from "../../domain/repositories/eonetRepository";

export function useEonetViewModel() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadEvents = async (currentLimit: number) => {
    try {
      const data = await eonetRepository.fetchEvents(currentLimit);
      setEvents(data);
    } catch {
      setError("Error al cargar los eventos EONET.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setLimit(prev => prev + 20);
  };

  useEffect(() => {
    loadEvents(limit);
  }, [limit]);

  return {
    events,
    loading,
    error,
    loadMore,
    loadingMore
  };
}
