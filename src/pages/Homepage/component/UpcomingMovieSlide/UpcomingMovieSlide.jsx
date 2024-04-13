import React from 'react';
import { usePopularMoviesQuery } from '../../../../hook/usePopularMovies';
import { Alert } from 'bootstrap';
// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import MovieCard from '../../../common/MovieCard/MovieCard';
import './UpcomingMovieSlide.style.css'
import Loading from '../../../Loading';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useUpcomingMoviesQuery } from '../../../../hook/useUpcomingMovies';
// import { useMovieGenreQuery } from '../../../hook/useMovieGenre';




const UpcomingMovieSlide = (props) => {

    // const {title} = props
    const {data, isLoading, isError, error} = useUpcomingMoviesQuery()
    // const {data} = useMovieGenreQuery()

    if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <div>
          <MovieSlider title='오직 웨이브에서만! &#128153;' movies={data.results} responsive={responsive}/>
        </div>
    );
};

export default UpcomingMovieSlide;