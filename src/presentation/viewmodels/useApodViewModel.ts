import { useEffect, useState } from "react";
import { GetAstronomyPicture } from "../../domain/usecases/GetAstronomyPicture";
import { NasaApiDatasource } from "../../data/datasources/NasaApiDatasource";
import { NasaRepositoryImpl } from "../../data/repositories/NasaRepositoryImpl";
import { AstronomyPicture } from "../../domain/entites/AstronomyPicture";

const useApodViewModel = () => {
  const [data, setData] = useState<AstronomyPicture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getApodUseCase = new GetAstronomyPicture(new NasaRepositoryImpl(new NasaApiDatasource()));

  useEffect(() => {
    getApodUseCase.execute()
      .then((result) => {
       const normalizedResult = Array.isArray(result) ? result : [result];
      setData(normalizedResult);
      })

      .catch(() => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
export default useApodViewModel;