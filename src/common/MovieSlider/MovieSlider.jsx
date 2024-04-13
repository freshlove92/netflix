import React from 'react';
import "./MovieSlider.style.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import MovieCard from "../MovieCard/MovieCard"
import { useNavigate } from 'react-router-dom';

const MovieSlider = ({title,movies,responsive}) => {

    const navi = useNavigate()
    const onClick =()=>{
        navi('/movies')
    }

    return (
        <div className='siliderBox'>
            
            <div className='categoryTitleBox'>
                <div><h3 className='categoryTitle'>{title}</h3></div>
                <div className='more' onClick={onClick}>더보기 〉</div>
            </div>

                <Carousel
                    infinite={true}
                    centerMode={true}
                    itemClass="movie-slider p-1"
                    containerClass="carousel-container"
                    responsive={responsive}
                    >
                    {movies && movies.map((movie,idx)=><MovieCard movie={movie} key={idx} />)}
                </Carousel>


        </div>
    );
};

export default MovieSlider;