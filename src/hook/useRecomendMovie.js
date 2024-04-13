import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchRecomendMovie =({id})=>{
     return api.get(`movie/${id}/recommendations${lang}`);
};

export const useRecomendMovieQuery = ({id}) => {
    return useQuery({
        queryKey: ["recommendations", id],
        queryFn: () => fetchRecomendMovie({id}),
        select: (result) => result.data,
    });
};

