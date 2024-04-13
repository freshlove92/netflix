import React from 'react';
import { usePopularMoviesQuery } from '../../../../hook/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"
import Loading from '../../../Loading';

const Banner = () => {

    const {data, isError, isLoading, error} = usePopularMoviesQuery()
    
    // console.log("오니?",data)

    if(isLoading){
        return <Loading size={100} />;
    }
    if(isError){
        <Alert variant="danger">{error.message}</Alert>
    }
    return (
        <div style={{backgroundImage:
            "url("+
            `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[1].poster_path}` +
            ")",
        }}
        className='banner'
        >
            <div className='text-White banner-text-area'>
                <h1>{data?.results[1].title}</h1>
                <p>{data?.results[1].overview}</p>
            </div>
        </div>
          
        
    );
};

export default Banner;