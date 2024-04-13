import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieTrailersQuery } from '../../hook/useMovieTrailers';
import Loading from '../Loading';


//예고편 보여주기 
//부트스트랩 모달을 이용하면 편하다고 함
//먼저 react-youtube를 다운받을것
//https://www.npmjs.com/package/react-youtube
//https://react-bootstrap.netlify.app/docs/components/modal

const MovieTrailers = ({id}) => {

    const [show, setShow] = useState(false);
    const {data,isLoading, isError,error} = useMovieTrailersQuery({id});
    console.log("유튜브 오니?", data)

   if(isLoading){
        return <Loading size={100} />
    }
    if(isError){
        return <Alert variant="danger">뭐 어쩌라고{error.message}</Alert>
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // YouTube 옵션 설정
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

   

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                예고편 보기
            </Button>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>영화 예고편</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* API 응답 데이터가 존재하고, results 배열이 비어있지 않은 경우에만 첫 번째 YouTube 컴포넌트를 렌더링합니다. */}
                    {data && data.results.length > 0 ? (
                        <YouTube videoId={data.results[0].key} opts={opts} />
                    ) : (
                        <Alert variant="warning">예고편을 불러올 수 없습니다.</Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MovieTrailers;