import { useEffect, useState } from "react";
import { GetAstronomyPicture } from "../../domain/usecases/GetAstronomyPicture";
import { NasaApiDatasource } from "../../data/datasources/NasaApiDatasource";
import { NasaRepositoryImpl } from "../../data/repositories/NasaRepositoryImpl";
import { AstronomyPicture } from "../../domain/entites/AstronomyPicture";

const getAstronomyPictureUseCase = new GetAstronomyPicture(
  new NasaRepositoryImpl(new NasaApiDatasource())
);

export function useAstronomyViewModel() {
  const [picture, setPicture] = useState<AstronomyPicture | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<string>(""); // nueva fecha seleccionada


  const getPicture = async (customDate?: string) => {
    setLoading(true);
    const api = new NasaApiDatasource();
    const data = await api.getAstronomyPicture(customDate);
    setPicture(data);
    setLoading(false);
  };

  useEffect(() => {
    getPicture();
  }, []);

  return {
    picture,
    loading,
    getPicture,
    date,
    setDate,
  };
};