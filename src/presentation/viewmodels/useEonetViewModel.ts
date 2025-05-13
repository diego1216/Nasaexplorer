import { useEffect, useState } from "react";
import { eonetRepository } from "../../domain/repositories/eonetRepository";

export function useEonetViewModel() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetched = await eonetRepository.fetchEvents();
      setEvents(fetched);
    } catch (err) {
      setError("Error al cargar eventos");
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
