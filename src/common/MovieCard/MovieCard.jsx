import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import { useMovieGenreQuery } from '../../hook/useMovieGenre';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { data: genreData } = useMovieGenreQuery();

    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj ? genreObj.name : '';
        });

        return genreNameList;
    };

    // 영화 카드 클릭 핸들러
    const handleCardClick = () => {
        navigate(`/movies/${movie.id}`); // 영화 상세 페이지로 이동
    };

    return (
        <div
            style={{
                backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")",
            }}
            className='movie-card'
            onClick={handleCardClick} // 카드 클릭 이벤트 핸들러 추가
        >
            <div className='overlay'>
                <h1 className='movieTitle'>{movie.title}</h1>
                <hr />
                {showGenre(movie.genre_ids).map((genre, index) => (
                    <Badge bg="primary" key={index} className='me-1'>{genre}</Badge>
                ))}
                <div><FontAwesomeIcon icon={faStar} />{movie.vote_average.toFixed(1)}</div>
                <div><FontAwesomeIcon icon={faThumbsUp} />{movie.popularity.toFixed(1)}</div>
                <div>{movie.adult ? 'ADULT' : 'ALL'}</div>
            </div>
        </div>
    );
};

export default MovieCard;
