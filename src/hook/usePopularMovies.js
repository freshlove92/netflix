import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchPopularMovies =()=>{
    return api.get(`/movie/popular${lang}`)
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ["movie-popular"],
        queryFn: fetchPopularMovies,
        select: (result)=>result.data,
    });
};

