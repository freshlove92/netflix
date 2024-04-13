import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { useSearchMovieQuery } from '../../hook/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import Loading from '../Loading';
import { Alert, Form } from "react-bootstrap";;


//2가지 경로
//상단에서 클릭해서 온 경우 -> 인기영화 보여주기
//키워드 검색으로 온 경우 -> 키워드와 관련된 영화 보여주기 

//페이지네이션 설치
//페이지 스테이트 만들기
//페이지네이션 클릭할때마다 페이지 바꿔주기
//페이지 값이 바뀔때 마다 유즈서치무비에 페이지까지 넣어서 페치

const MoviePage = () => {

   const [page, setPage] = useState(1) //페이지네이션 상태(초기값)
   const [query, setQuery] = useSearchParams()
   const keyword = query.get("q")
   const {data, isLoading, isError, error} = useSearchMovieQuery({keyword,page})
   //console.log("ddd",data)
   
   const [sortedData, setSortedData] = useState(null); // 인기있는 영화를 정렬하기 위한 상태 (초기값 NULL)
   const [sortedRankData, setSortedRankData] = useState(null); // 최신순 영화를 정렬하기 위한 상태
   const [selectedGenre, setSelectedGenre] = useState(null); // 장르별 필터링을 위한 상태


    // 페이지 변경 함수
    const handlePageClick = ({selected}) => {
        setPage(selected + 1);
    };

    // 인기순 정렬 함수
    const handleSortPopularRank = () => {
        const sortedMovies = [...data.results].sort((a, b) => b.popularity - a.popularity);
        setSortedData(sortedMovies);
        setSortedRankData(null);
    };

    // 최신순 정렬 함수
    const handleSortRecentRank = () => {
        const sortedRankMovies = [...data.results].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        setSortedRankData(sortedRankMovies);
        setSortedData(null);
    };

    // 키워드 변경 시 페이지 및 정렬 상태 초기화
    useEffect(() => {
        setPage(1);
        setSortedData(null);
        setSortedRankData(null);
    }, [keyword]);

    // 페이지 변경 시 정렬 상태 초기화
    useEffect(() => {
        setSortedData(null);
        setSortedRankData(null);
    }, [page]);

    // 장르 선택 함수
  const ReadingGenre = (event) => {
    const selectedGenreName = event.target.innerText;
    const selectedGenreId = genre.find((item) => item?.name === selectedGenreName)?.id;
  
    if (selectedGenreId) {
      const filteredMovies = data?.results.filter((movie) => movie?.genre_ids.includes(selectedGenreId));
      setSelectedGenre(filteredMovies);
      setSortedData(null);
      setSortedRankData(null);
      setPage(1); // 선택한 장르가 변경되었으므로 페이지를 1로 초기화
    }
  };

    // 필터링 및 정렬된 영화 데이터
    const filteredAndSortedMovies = () => {
        let movies = data?.results || [];

        if (selectedGenre !== 'all') {
            movies = movies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
        }

        if (sortOrder === 'popular') {
            movies.sort((a, b) => b.popularity - a.popularity);
        }

        return movies;
    };



    // 로딩 중 화면 처리
    if(isLoading){
        return <Loading size={100} />
    }
    // 에러 발생 시 화면 처리
    if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }

    

    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    
                    <Form>
                        <Form.Group>
                            <Form.Label>장르별 필터</Form.Label>
                            <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
                                <option value="all">모든 장르</option>
                                <option value="action">액션</option>
                                <option value="comedy">코미디</option>
                                <option value="family">가족</option>
                                <option value="fantasy">SF</option>
                                <option value="animation">애니메이션</option>
                                
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>정렬</Form.Label>
                            <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
                                <option value="popular">인기순</option>
                                <option value="new">최신순</option>
                            </Form.Control>
                        </Form.Group> */}
                    </Form>
                </Col>
                {/* <Col lg={8} xs={12}>
                    <Row>
                        {filteredAndSortedMovies().map((movie, index) => (
                            <Col key={index} lg={4} xs={12}>
                                <MovieCard movie={movie}/>
                            </Col>
                        ))}
                    </Row>

                </Col>
                <Col lg={8} xs={12}>

                    <Row>
                        {data?.results.map((movie,index)=>(
                        <Col key={index} lg={4} xs={12}>
                        <MovieCard movie={movie}/>
                        </Col>
                        ))}
                    </Row>

      
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={5} //전체페이지 숫자!
                        // pageCount={data?.total_pages} //전체페이지 숫자!
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={0}
                    />

                </Col>       

            </Row>
        </Container>
    );
};

export default MoviePage;