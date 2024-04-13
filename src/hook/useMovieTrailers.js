import { useQuery } from "@tanstack/react-query";
import api from "../utlis/api"

// const lang = '?language=ko-KR'; //한국어설정!!!

const fetchMovieTrailers =({id})=>{
    return api.get(`movie/${id}/videos`);
};

export const useMovieTrailersQuery = ({id}) => {
    return useQuery({
        queryKey: ["videos", id],
        queryFn: ()=>fetchMovieTrailers({id}),
        select: (result)=>result.data,
    });
};


