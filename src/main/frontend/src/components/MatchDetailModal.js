import {useNavigate, useParams} from "react-router-dom";
import {ShowAlert} from "./ShowAlert";
import {useEffect, useState} from "react";
import {Button, Container, Modal} from "react-bootstrap";
import {LoadingSpinner} from "./LoadingSpinner";
import "../styles/MatchDetailModal.scss"
import MatchPlace from "../images/detail/matchPlace.png"
import MatchDate from "../images/detail/matchDate.png"
import MatchPrice from "../images/detail/matchPrice.png"
import NumPerson from "../images/detail/numPerson.png"
import Level from "../images/detail/level.png"
import MatchContact from "../images/detail/matchContact.png"
import CanParking from "../images/detail/canParking.png"
import MatchStatus from "../images/detail/matchStatus.png"
import MainText from "../images/detail/mainText.png"
import Nickname from "../images/detail/nickname.png"
import {RemoveData} from "./RemoveData";
import {BoardUpdateModal} from "./BoardUpdateModal";
import Swal from "sweetalert2";
import {DeleteBoard, DetailBoard, MatchingFinished} from "../api/Api";

export const MatchDetailModal = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [isFinished, setIsFinished] = useState(false); // false -> 매칭 중 / true -> 매칭 마감
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [board, setBoard] = useState([]);
    const {id} = useParams();
    const [boardWriter, setBoardWriter] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // 모달 핸들러 함수
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleClose = () => {
        navigate(-1);
    }

    // 매칭 상태 변경 함수
    const handleMatchingFinished = async () => {
        MatchingFinished(id, navigate)
    }
    // 글 삭제 함수
    const handleDeleteBoard = async () => {
        Swal.fire({
            title: "정말 삭제하시겠습니까?",
            text: "되돌릴 수 없습니다",
            icon: "danger",
            confirmButtonColor: "red",
            confirmButtonText: "확인",
            cancelButtonText: '취소',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteBoard(id, navigate)
            }
        })
    }

    useEffect(() => {
        if (!loggedIn) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
        // 글 세부사항 조회 함수
        DetailBoard(id,navigate,setBoard,setLoading,setBoardWriter,setIsFinished);
    },[])

    return loading ?
        (
            <>
                <Container style={{marginBottom: "600px"}}/>
                <Modal show onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Container><img src={MatchPlace} style={{paddingRight: "100px"}} alt="MatchPlace"/>{board.matchPlace}&nbsp;&nbsp; -&nbsp;&nbsp; <span style={{fontSize: "20px"}}>{board.place}</span></Container>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className="board_container"><img src={MatchDate} style={{paddingRight: "100px"}} alt="MatchDate"/>{board.matchDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{board.matchTime}</Container>
                        <Container className="board_container"><img src={MatchPrice} style={{paddingRight: "100px"}} alt="MatchPrice"/>₩ {board.matchPrice}</Container>
                        <Container className="board_container"><img src={NumPerson} style={{paddingRight: "100px"}} alt="NumPerson"/>{board.numPerson}</Container>
                        <Container className="board_container"><img src={Level} style={{paddingRight: "100px"}} alt="Level"/>{board.level}</Container>
                        <Container className="board_container"><img src={MatchContact} style={{paddingRight: "100px"}} alt="MatchContact"/>{board.matchContact}</Container>
                        <Container className="board_container"><img src={CanParking} style={{paddingRight: "100px"}} alt="CanParking"/>{board.canParking}</Container>
                        <Container className="board_container"><img src={MainText} style={{paddingRight: "100px"}} alt="MainText"/>{board.mainText}</Container>
                        <Container className="board_container"><img src={Nickname} style={{paddingRight: "100px"}} alt="Nickname"/>{board.nickname}</Container>
                        <Container className="board_container"><img src={MatchStatus} style={{paddingRight: "85px"}} alt="MatchStatus"/>{board.matchStatus}</Container>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <div className="d-flex">
                            {boardWriter && (
                                <>
                                    <Button variant="danger" onClick={handleDeleteBoard}>
                                        글 삭제
                                    </Button>
                                    &nbsp;&nbsp;
                                    {isFinished ? (
                                        <Button variant="outline-danger" onClick={handleMatchingFinished}>
                                            매칭 중
                                        </Button>
                                    ) : (
                                        <Button variant="outline-danger" onClick={handleMatchingFinished}>
                                            매칭 마감
                                        </Button>
                                    )
                                    }
                                        &nbsp;&nbsp;
                                    <Button variant="success" onClick={handleShowModal}>
                                        글 수정
                                    </Button>
                                    <BoardUpdateModal
                                        showModal={showModal}
                                        handleCloseModal={handleCloseModal}
                                        board={board}
                                    />
                                </>
                            )}
                        </div>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        ) : (
            <LoadingSpinner/>
        )
}