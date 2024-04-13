// import { Navbar } from 'react-bootstrap';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import HomePage from './pages/Homepage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

// 메인페이지  -> /
// 영화 전체 보여주는 페이지 -> /movie (q=어쩌구)
// 영화 디테일 페이지 -> /movie/:id

function App() {
  return (
    <div className="background">
      
      <Routes>
        <Route path='/' element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path='movies' element={<MoviePage />}/> {/* 영화 목록 페이지 */}
            <Route path='movies/:id' element={<MovieDetailPage/>}/> {/* 영화 상세 페이지 */}
        </Route>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}



export default App;
