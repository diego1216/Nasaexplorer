import { useEffect, useState } from "react";
import { donkiRepository } from "../../domain/repositories/donkiRepository";

const getDateString = (date: Date) => date.toISOString().split("T")[0];
const RANGE_DAYS = 5;

export function useDonkiViewModel() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dayOffset, setDayOffset] = useState(0);

  const today = new Date();

  const calculateDates = (offset: number) => {
    const end = new Date(today);
    end.setDate(end.getDate() - offset);

    const start = new Date(end);
    start.setDate(start.getDate() - RANGE_DAYS);

    return {
      startDate: getDateString(start),
      endDate: getDateString(end),
    };
  };

  const loadInitial = async () => {
    try {
      setLoading(true);
      const { startDate, endDate } = calculateDates(0);
      const data = await donkiRepository.fetchCmeEvents(startDate, endDate);
      setEvents(data);
      setDayOffset(RANGE_DAYS);
    } catch {
      setError("Error al cargar los eventos DONKI.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;

    const { startDate, endDate } = calculateDates(dayOffset);
    setLoadingMore(true);

    try {
      const data = await donkiRepository.fetchCmeEvents(startDate, endDate);
      setEvents(prev => [...prev, ...data]);
      setDayOffset(prev => prev + RANGE_DAYS);
    } catch {
      setError("Error al cargar más eventos.");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadInitial();
  }, []);

  return {
    events,
    loading,
    error,
    loadMore,
    loadingMore,
  };
}
