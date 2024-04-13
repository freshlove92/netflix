import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchMovieDetail =(id)=> async () => {
    return await api.get(`movie/${id}${lang}`);
};

export const useMovieDetailQuery = ({id}) => {
    return useQuery({
        queryKey: ["movie-search", id],
        queryFn: fetchMovieDetail(id),
        select: (result)=>result.data,
    });
};
// console.log(data)