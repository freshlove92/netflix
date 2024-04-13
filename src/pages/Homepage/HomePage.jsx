import React from 'react';
import Banner from './component/banner/Banner';
// import PopularMovieSlide from './PopularMovieSlide/PopularMovieSlide';
// import MovieSlider from '../../common/MovieSlider/MovieSlider';
import PopularMovieSlide from './component/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './component/TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './component/UpcomingMovieSlide/UpcomingMovieSlide';
import Footer from './component/footer/Footer';


//1. 큰 배너 -> 팝퓰러 뮤비의 첫번째 아이템을 보여주자
//2. 팝퓰러 뮤비
//3. 탑 랭크 뮤비
//4. 업커밍 뮤비

const HomePage = () => {
    return (
        <div>
            <Banner />
            <PopularMovieSlide />
            <TopRatedMovieSlide />
            <UpcomingMovieSlide />
            <Footer />
        </div>
    );
};

export default HomePage;