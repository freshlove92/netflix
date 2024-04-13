import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { useSearchMovieQuery } from '../../hook/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import Loading from '../Loading';
import { Alert, Form } from "react-bootstrap";;



const MoviePage = () => {


    ///////////////////////////////////////////////////////////////////
    // const [oneValue, setOneValue] = useState("all")
    // const [twoValue, setTwoValue] = useState("resent")
    // const [selectedData, setSelectedData] = useState("기본")

    // const oneChange = (event) => {
    //     setOneValue(event.target.value)
    // }

    // const twoChange = (event) => {
    //     setTwoValue(event.target.value)
    // }
    

    // useEffect(()=>{
    // if(oneValue==="all"){
    //     if(twoValue==="resent"){
    //         setSelectedData("전체 최신순")
    //     }else if(twoValue==="popul"){
    //         setSelectedData("전체 인기순")
    //     }else{
    //         setSelectedData("전체 평점순")
    //     }
    // }else if(oneValue==="action"){
    //     if(twoValue==="resent"){
    //         setSelectedData("액션 최신순")
    //     }else if(twoValue==="popul"){
    //         setSelectedData("액션 인기순")
    //     }else{
    //         setSelectedData("액션 평점순")
    //     }
    // }else if(oneValue==="comedy"){
    //     if(twoValue==="resent"){
    //         setSelectedData("코미디 최신순")
    //     }else if(twoValue==="popul"){
    //         setSelectedData("코미디 인기순")
    //     }else{
    //         setSelectedData("코미디 평점순")
    //     }
    // }else{
    //     if(twoValue==="resent"){
    //         setSelectedData("가족 최신순")
    //     }else if(twoValue==="popul"){
    //         setSelectedData("가족 인기순")
    //     }else{
    //         setSelectedData("가족 평점순")
    //     }
    // }
    // }, [oneValue, twoValue])
    
    // return(
    //     <>
    //         <select value={oneValue} onChange={oneChange}>
    //             <option value='all'>장르</option>
    //             <option value='action'>액션</option>
    //             <option value='comedy'>코미디</option>
    //             <option value='family'>가족</option>
    //         </select>
    //         <select value={twoValue} onChange={twoChange}>
    //             <option value='resent'>최신순</option>
    //             <option value='popul'>인기순</option>
    //             <option value='star'>평점순</option>
    //         </select>
    //         <div>
    //             {selectedData}
    //         </div>
        
    //     </>
    // )


    /////////////////////////////////////////////////////////////////
   const [page, setPage] = useState(1) //페이지네이션 상태(초기값)
   const [query, setQuery] = useSearchParams()
   const keyword = query.get("q")
   const {data, isLoading, isError, error} = useSearchMovieQuery({keyword,page})
   //    console.log("ddd",data)
   
   const [selectedGenre, setSelectedGenre] = useState('all'); //  장르별 영화를 정렬하기 위한 상태
   const [sortOrder, setSortOrder] = useState('popular');; // 최신별 필터링을 위한 상태

    // 페이지 변경 함수
    const handlePageClick = ({selected}) => {
        setPage(selected + 1);
    };

    // 정렬 변경 핸들러
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // 장르 변경 핸들러 함수
const handleGenreChange = (e) => { 
    const value = e.target.value;
    // 'all'일 경우에는 문자열 'all'을 그대로 사용하고, 그 외의 경우에는 정수로 사용하려고 함.
    setSelectedGenre(value === 'all' ? 'all' : parseInt(value, 10));
};


    // 필터링 및 정렬된 영화 데이터
    const filteredAndSortedMovies = () => {
        let movies = data?.results || [];

        if (selectedGenre !== 'all') {
            movies = movies.filter(movie => movie.genre_ids.includes(parseInt(selectedGenre)));
        }
 
        if (sortOrder === 'popular') {
            movies.sort((a, b) => b.popularity - a.popularity);
        } else if (sortOrder === 'new') {
            movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (sortOrder === 'rated') {
         movies.sort((a, b) => b.vote_average - a.vote_average);
        }

        return movies;
    };

    if(isLoading){
        return <Loading size={100} />
    }
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
                                <option value="28">액션</option>
                                <option value="35">코미디</option>
                                <option value="10751">가족</option>    
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>정렬 필터</Form.Label>
                            <Form.Control as="select" value={sortOrder} onChange={handleSortChange}>
                                <option value="popular">인기순</option>
                                <option value="new">최신순</option>
                                <option value="rated">평점순</option>
                            </Form.Control>
                        </Form.Group>

                    </Form>
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {filteredAndSortedMovies().map((movie, index) => (
                            <Col key={index} lg={4} xs={6}> {/* 모바일 화면에서 한 줄에 2개씩 나오도록 xs 값을 6으로 변경*/}
                                <MovieCard movie={movie}/>
                            </Col>
                        ))}
                    </Row>

                
                    {/* <Col lg={8} xs={12}>

                        <Row>
                            {data?.results.map((movie,index)=>(
                            <Col key={index} lg={4} xs={12}>
                            <MovieCard movie={movie}/>
                            </Col>
                            ))}
                        </Row> */}

      
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        // pageCount={5} //전체페이지 숫자!
                        pageCount={data?.total_pages} //전체페이지 숫자! 너무 많은디?
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
                        forcePage={page-1}

                    />

                </Col>       

            </Row>
        </Container>
    );
};

export default MoviePage;