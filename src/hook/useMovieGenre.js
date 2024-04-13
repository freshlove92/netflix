import React from 'react';
import api from '../utlis/api';
import {useQuery} from "@tanstack/react-query"

const lang = '?language=ko-KR';

const fetchMovieGenre =()=>{
    return api.get( `/genre/movie/list`)
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ["movie_genre"],
        queryFn: fetchMovieGenre,
        select:(result)=>result.data.genres
});
};