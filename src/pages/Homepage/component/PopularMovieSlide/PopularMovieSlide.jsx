import React from 'react';
import { usePopularMoviesQuery } from '../../../../hook/usePopularMovies';
import { Alert } from 'react-bootstrap';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import MovieCard from '../../../common/MovieCard/MovieCard';
import './PopularMovieSlide.style.css'
import Loading from '../../../Loading';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
// import { useMovieGenreQuery } from '../../../hook/useMovieGenre';



const PopularMovieSlide = (props) => {

    // const {title} = props
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
   console.log("usePopularMoviesQuery",data)

    if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <div>
          <MovieSlider title='믿고 보는 추천작 &#10024;' 
                    movies={data.results} responsive={responsive}/>
        </div>
    );
};

export default PopularMovieSlide;