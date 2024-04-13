import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchTopRatedMovies =()=>{
    return api.get(`/movie/top_rated${lang}`)
  
}
//  console.log("fetchTopRatedMovies",fetchTopRatedMovies)

export const useTopMoviesQuery = () => {
    return useQuery({
        queryKey: ["top-rated-movies"],
        queryFn: fetchTopRatedMovies,
        select: (result)=> result.data,
        staleTime: 300000, //5분
    });
};

