import { useEffect, useState } from "react";
import { donkiRepository } from "../../domain/repositories/donkiRepository";

export function useDonkiViewModel(startDate = "2024-01-01") {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const result = await donkiRepository.fetchCmeEvents(startDate);
      setEvents(result);
    } catch (err) {
      setError("Error al cargar los eventos DONKI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    loading,
    error,
    reload: loadEvents
  };
}
