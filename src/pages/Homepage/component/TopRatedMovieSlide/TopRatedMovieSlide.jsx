import React from 'react';
import { Alert } from 'bootstrap';
import Loading from '../../../Loading';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';
import { useTopMoviesQuery } from '../../../../hook/useTopMovies';
// import { useMovieGenreQuery } from '../../../../hook/useMovieGenre';



const TopRatedMovieSlide = (props) => {

    // const {title} = props
    const {data, isLoading, isError, error} = useTopMoviesQuery()
  
    console.log("useMovieGenreQuery",data)
    if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }

    return (
        <div>
          <MovieSlider title='실시간 인기 콘텐츠 &#128077;' movies={data?.results} responsive={responsive}/>
        </div>
    );
};

export default TopRatedMovieSlide;