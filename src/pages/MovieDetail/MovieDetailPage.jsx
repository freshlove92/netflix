import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useMovieDetailQuery } from '../../hook/useMovieDetail'; // 경로는 실제 프로젝트 구조에 맞게 조정해주세요.
import { useParams, useNavigate } from 'react-router-dom';
import { Alert,Button } from 'react-bootstrap';
import Loading from '../Loading';
import RecomendMovie from '../RecomendMovie/RecomendMovie';
import MovieReview from '../MovieReview/MovieReview';
import MovieTrailers from '../MovieTrailers/MovieTrailers';
import './MovieDetailPage.style.css'
import Footer from '../Homepage/component/footer/Footer';

const MovieDetailPage = () => {
  const { id } = useParams();
  console.log("id가 넘어오니?", id)

  const navi = useNavigate();
  
  const {data,isLoading, isError,error} = useMovieDetailQuery({id});
  console.log("data 넘어오니?", data)
   if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">뭐 어쩌라고</Alert>
    }
//   장르 배열을 문자열로 변환
  const genres = data.genres.map(genre => genre.name).join(', ');

// 이전 페이지로 돌아가기
   const handleClose = () => {
    navi(-1); 
  };

  return (
    <>
    <Container>
      
      <Row className="justify-content-md-center">
        <Col lg={8}>
        <Button variant="secondary" onClick={handleClose} style={{ marginBottom: '10px' }}>
            X
          </Button>
          <Card>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
            <Card.Body >
              <Card.Title className='detailtitle'>{data.title}</Card.Title>
              <Card.Text className='detailBox'>
                <strong className='titileBox'>장르</strong>　{genres}<br />
                <strong className='titileBox'>인기도</strong>　{data.popularity}<br />
                <strong className='titileBox'>줄거리</strong>　{data.overview}<br />
                <strong className='titileBox'>예산</strong>　${data.budget.toLocaleString()}<br />
                <strong className='titileBox'>개봉일</strong>　{data.release_date}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <br/>
    <br/>
    <MovieTrailers id={id}/>
    <br/>
    <br/>
    <br/>
    <RecomendMovie id={id}/>
    <br/>
    <br/>
    <MovieReview id={id} />
    <Footer />
    </>
  );
};

export default MovieDetailPage;