import { useEffect, useState } from "react";
import { getAsteroids } from "../../data/datasources/neoService";

export const useAsteroidsViewModel = () => {
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const data = await getAsteroids();
        setAsteroids(data);
      } catch (error) {
        console.error("Error al obtener asteroides", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  return { asteroids, loading };
};
