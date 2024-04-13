import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchMovieReconnend =(movieId)=> async () => {
    const response = await api.get(`movie/${movieId}/recommendations?language=ko-KR`);
  return response.data;
};

export const useMovieReconnendQuery = (movieId) => {
    return useQuery({
    queryKey: ["movie-recommendations", movieId],
    queryFn: fetchMovieReconnend(movieId),
  });
};
