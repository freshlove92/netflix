import React, { useEffect, useState } from 'react';
import { useRecomendMovieQuery } from '../../hook/useRecomendMovie'
import Loading from '../Loading';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

//추천영화 보여주기 api확인

const RecomendMovie = ({id}) => {

    const navi = useNavigate()
    const {data,isLoading, isError,error} = useRecomendMovieQuery({id});
    // console.log("와야지", data)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

     const getCardStyle = () => {
        if(windowWidth < 600) {
            return { cursor: 'pointer', flex: '1 0 48%', margin: '1%', textAlign: 'center' }; // 모바일 화면에서의 스타일
        } else {
            return { cursor: 'pointer', flex: '1 0 8.5%', margin: '10px', textAlign: 'center' }; // 기본 스타일
        }
    };

   if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">뭐 어쩌라고{error.message}</Alert>
    }

    const handleMovieClick = (movieId) => {
        navi(`/movies/${movieId}`);
    };

     return (
        <div>
            <h2>추천 영화</h2>
            {data && data.results.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {data.results.map(data => (
                    <div key={data.id} style={getCardStyle()} onClick={() => handleMovieClick(data.id)}>
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} style={{ width: '100%', height: 'auto' }} />
                        <h3 style={{ fontSize: '1rem' }}>{data.title}</h3>
                    </div>
                ))}
            </div>
            ) : (
                <p>추천 영화가 없습니다.</p>
            )}
        </div>
    );
};

export default RecomendMovie;