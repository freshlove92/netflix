import React, { useState } from 'react';
import { useMovieReviewQuery } from '../../hook/useMovieReview';
import './MovieReview.style.css'

// 리뷰 api 참고해보자
// 더보기 / 접기 버튼 추가

const MovieReview = ({id}) => {
   const { data: reviews, isLoading, error } = useMovieReviewQuery({ id });
  
  // 각 리뷰의 펼침/접힘 상태를 관리하는 상태
  const [expandedReviewIds, setExpandedReviewIds] = useState([]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  // 리뷰 내용을 펼치거나 접는 함수
  
  const toggleReviewContent = (reviewId) => {
    setExpandedReviewIds(prevIds =>
      prevIds.includes(reviewId) ? prevIds.filter(id => id !== reviewId) : [...prevIds, reviewId]
    );
  };

  // 항상 처음 3개의 리뷰만 표시
  const displayedReviews = reviews.results.slice(0, 3);

  return (
    <div>
      <h2>영화 리뷰</h2>
      {reviews && reviews.results.length > 0 ? (
        <div >
          <ul>
            {displayedReviews.map((review) => (
              <li key={review.id} className='reviewbox'>
                <p><strong>{review.author}</strong></p>
                <p>
                  {expandedReviewIds.includes(review.id) ?
                    review.content :
                    `${review.content.substring(0, 100)}...`}
                  {review.content.length > 100}
                </p>
                <button onClick={() => toggleReviewContent(review.id)}>more</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MovieReview;