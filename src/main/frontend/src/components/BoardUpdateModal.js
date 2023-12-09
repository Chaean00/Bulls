import {Button,Form, Modal} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {UpdateBoard} from "../api/Api";

export const BoardUpdateModal = ({ showModal, handleCloseModal, board }) => {

    const navigate = useNavigate();
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const getCurrentTime = () => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const [inputs, setInputs] = useState({
        matchTime: board.matchTime,
        matchDate: board.matchDate,
        postTime: getCurrentTime(),
        postDate: getCurrentDate(),
        place: board.place,
        matchPlace: board.matchPlace,
        matchPrice: board.matchPrice,
        level: board.level,
        canParking: board.canParking,
        matchStatus: board.matchStatus,
        numPerson: board.numPerson,
        matchContact: board.matchContact,
        mainText: board.mainText,
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        console.log(inputs)
    }

    const handleUpdateBtn = async (e) => {
        e.preventDefault();
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0)
        const matchDate = new Date(inputs.matchDate);
        matchDate.setHours(0,0,0,0);
        const todayTime = new Date();
        const matchTime = new Date(matchDate.toDateString() + ' ' + inputs.matchTime);

        // 시간 확인
        if (matchTime < todayTime) {
            document.getElementById("matchTime").value = "";
            document.getElementById("matchTime").focus();
            Swal.fire("선택한 시간이 현재 시간보다 이전입니다", "다시 선택해주세요", "error");
            return;
        }

        // 날짜 확인
        if (matchDate < todayDate) {
            document.getElementById("matchDate").value = "";
            document.getElementById("matchDate").focus();
            Swal.fire("오늘 이전의 날짜를 선택할 수 없습니다", "다시 선택해주세요", "error");
            return;
        }
        UpdateBoard(board.id, navigate, inputs, handleCloseModal)
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>글 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h3 className="inquiry_text">매칭 등록하기</h3>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>경기 날짜</Form.Label>
                        <Form.Control id="matchDate" type="date" placeholder="경기 날짜" name="matchDate" defaultValue={board.matchDate}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>경기 시간</Form.Label>
                        <Form.Control id="matchTime" type="time" placeholder="경기 시간" name="matchTime" defaultValue={board.matchTime}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>지역</Form.Label>
                        <Form.Select name="place" defaultValue={board.place} onChange={handleChange}>
                            <option value="" selected disabled hidden>지역을 선택해주세요</option>
                            <option value="서울">서울</option>
                            <option value="경기">경기</option>
                            <option value="강원">강원</option>
                            <option value="울산">울산</option>
                            <option value="부산">부산</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>경기 장소</Form.Label>
                        <Form.Control type="textarea" placeholder="경기 장소" name="matchPlace" defaultValue={board.matchPlace}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>구장 가격</Form.Label>
                        <Form.Control type="number" placeholder="구장 가격" name="matchPrice" defaultValue={board.matchPrice}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>Level</Form.Label>
                        <Form.Select name="level" defaultValue={board.level} onChange={handleChange}>
                            <option value="" selected disabled hidden>레벨을 선택해주세요</option>
                            <option value="하하">하하</option>
                            <option value="중하">중하</option>
                            <option value="중">중</option>
                            <option value="중상">중상</option>
                            <option value="상">상</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>주차 여부</Form.Label><br/>
                        <Form.Check inline type="radio" label="주차 가능" name="canParking" value="주차 가능"
                                    onChange={handleChange} defaultChecked={board.canParking === "주차 가능"}/>
                        <Form.Check inline type="radio" label="주차 불가능" name="canParking" value="주차 불가능"
                                    onChange={handleChange} defaultChecked={board.canParking === "주차 불가능"}/>
                        <Form.Check inline type="radio" label="주차 여부 모름" name="canParking" value="주차 여부 모름"
                                    onChange={handleChange} defaultChecked={board.canParking === "주차 여부 모름"}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>모집 인원</Form.Label>
                        <Form.Select name="numPerson" defaultValue={board.numPerson} onChange={handleChange}>
                            <option value="" selected disabled hidden>모집인원을 선택해주세요</option>
                            <option value="11vs11">11vs11</option>
                            <option value="10vs10">10vs10</option>
                            <option value="9vs9">9vs9</option>
                            <option value="11vs11">8vs8</option>
                            <option value="10vs10">7vs7</option>
                            <option value="9vs9">6vs6</option>
                            <option value="9vs9">5vs5</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>연락 방법</Form.Label>
                        <Form.Control type="textarea" placeholder="연락 방법" name="matchContact"
                                      defaultValue={board.matchContact} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>본문</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="본문" name="mainText" defaultValue={board.mainText}
                                      onChange={handleChange}/>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div>
                    <Button variant="primary" type="submit" className="regist_btn" onClick={handleUpdateBtn}>
                        등록하기
                    </Button>
                </div>
                <Button variant="secondary" onClick={handleCloseModal}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    )
}