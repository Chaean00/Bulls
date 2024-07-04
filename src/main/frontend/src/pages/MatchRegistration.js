import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../utils/ShowAlert";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {Button, Container, Form} from "react-bootstrap";
import "../styles/MatchRegistration.scss"
import Swal from "sweetalert2";
import {RemoveData} from "../utils/RemoveData";
import {MatchCreate} from "../api/MatchApi";

export const MatchRegistration = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("loggedIn") === "true"
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
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const handleRegistration = async (e) => {
        e.preventDefault()
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

        await MatchCreate(navigate, inputs);
    }
    const [inputs, setInputs] = useState({
        matchTime: '',
        matchDate: '',
        postTime: getCurrentTime(),
        postDate: getCurrentDate(),
        place: '',
        matchPlace: '',
        matchPrice: '',
        level: '',
        canParking: '',
        matchStatus: '매칭중',
        numPerson: '',
        matchContact: '',
        mainText: '',
    });


        useEffect(() => {
            if (!loggedIn) {
                RemoveData();
                ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            }
        }, [navigate, loggedIn])

        return loggedIn ? (
            <Container className="inquiry_container">
                <Form>
                    <h3 className="inquiry_text">매칭 등록하기</h3>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>경기 날짜</Form.Label>
                        <Form.Control id="matchDate" type="date" placeholder="경기 날짜" name="matchDate" value={inputs.matchDate}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>경기 시간</Form.Label>
                        <Form.Control id="matchTime" type="time" placeholder="경기 시간" name="matchTime" value={inputs.matchTime}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>지역</Form.Label>
                        <Form.Select name="place" value={inputs.place} onChange={handleChange}>
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
                        <Form.Control type="textarea" placeholder="경기 장소" name="matchPlace" value={inputs.matchPlace}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>구장 가격</Form.Label>
                        <Form.Control type="number" placeholder="구장 가격" name="matchPrice" value={inputs.matchPrice}
                                      onChange={handleChange} step={1000}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>Level</Form.Label>
                        <Form.Select name="level" value={inputs.level} onChange={handleChange}>
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
                                    onChange={handleChange}/>
                        <Form.Check inline type="radio" label="주차 불가능" name="canParking" value="주차 불가능"
                                    onChange={handleChange}/>
                        <Form.Check inline type="radio" label="주차 여부 모름" name="canParking" value="주차 여부 모름"
                                    onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlTextarea1">
                        <Form.Label>모집 인원</Form.Label>
                        <Form.Select name="numPerson" value={inputs.numPerson} onChange={handleChange}>
                            <option value="" selected disabled hidden>모집인원을 선택해주세요</option>
                            <option value="11vs11">11vs11</option>
                            <option value="10vs10">10vs10</option>
                            <option value="9vs9">9vs9</option>
                            <option value="8vs8">8vs8</option>
                            <option value="7vs7">7vs7</option>
                            <option value="6vs6">6vs6</option>
                            <option value="5vs5">5vs5</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="ControlInput1">
                        <Form.Label>연락 방법</Form.Label>
                        <Form.Control type="textarea" placeholder="연락 방법" name="matchContact"
                                      value={inputs.matchContact} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>본문</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="본문" name="mainText" value={inputs.mainText}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="regist_btn" onClick={handleRegistration}>
                        등록하기
                    </Button>
                </Form>
            </Container>
        ) :
        (
            <LoadingSpinner/>
        );
};
