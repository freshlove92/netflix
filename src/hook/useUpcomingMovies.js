import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchUpcomingMovies =()=>{
    return api.get(`/movie/upcoming${lang}`)
  
}

export const useUpcomingMoviesQuery = () => {
    return useQuery({
        queryKey: ["upcoming-movies"],
        queryFn: fetchUpcomingMovies,
        select: (result)=> result.data,
        // staleTime: 300000, //5분
    });
};

