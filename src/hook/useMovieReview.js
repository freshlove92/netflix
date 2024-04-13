import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

const lang = '?language=ko-KR'; //한국어설정!!!

const fetchMovieReview = ({id}) => {
   return api.get(`movie/${id}/reviews`) 
};

export const useMovieReviewQuery = ({id}) => {
    return useQuery({
        queryKey: ["reviews", id],
        queryFn: ()=> fetchMovieReview({id}),
        select: (result)=>result.data,
    });
};
