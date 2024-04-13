import React from 'react';
import './NotFoundPage.css'; // CSS 파일 import
import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>영화를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않거나, URL이 잘못되었습니다.</p>
      <Link to="/" className="home-link">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFoundPage;
