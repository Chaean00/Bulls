import {useEffect, useState} from "react";
import {Button, Container, DropdownButton, Form, Dropdown} from "react-bootstrap";
import "../styles/TeamRegistration.scss"
import {useNavigate} from "react-router-dom";
import {ShowAlert} from "../components/ShowAlert";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {TeamCreate} from "../api/Api";
import {RemoveData} from "../components/RemoveData";

export const TeamRegistration = () => {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [team, setTeam] = useState({
        teamName: "",
        teamCaptain: "",
        teamIntroduce: "",
        teamPhone: "",
        teamArea: "",
    })

    useEffect(() => {
        if (!loggedIn) {
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            RemoveData();
        }
    }, [loggedIn])

    const handleChange = (e) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value
        })
    }

    const handleTeam = async (e) => {
        e.preventDefault()
        await TeamCreate(navigate, team);
    }

    return loggedIn ? (
        <Container className="team_container">
            <Form>
                <h3 className="team_text">팀 등록하기</h3>
                <br/>
                <Container>
                    <Form.Group className="team_group" controlId="team_input1">
                        <Form.Label>팀 명</Form.Label>
                        <Form.Control type="textarea" placeholder="팀 명" name="teamName"
                                      value={team.teamName}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input2">
                        <Form.Label className="team_label">주장 성함</Form.Label>
                        <Form.Control type="textarea" placeholder="주장 성함" name="teamCaptain"
                                      value={team.teamCaptain}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input3">
                        <Form.Label className="team_label">팀 소개</Form.Label>
                        <Form.Control type="textarea" placeholder="팀 소개" name="teamIntroduce"
                                      value={team.teamIntroduce}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input4">
                        <Form.Label className="team_label">대표 연락처</Form.Label>
                        <Form.Control type="textarea" placeholder="대표 연락처" name="teamPhone"
                                      value={team.teamPhone}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="team_group" controlId="team_input5">
                        <Form.Label className="team_label">활동 지역</Form.Label>
                        <Form.Control type="textarea" placeholder="활동 지역" name="teamArea"
                                      value={team.teamArea}
                                      onChange={handleChange}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <DropdownButton drop="down" id="dropdown-button-drop-down" title="유의사항" variant="secondary">
                            <Dropdown.ItemText><p style={{fontSize: "16px"}}>* 팀은 유저당 하나만 등록할 수 있습니다.</p></Dropdown.ItemText>
                            <Dropdown.ItemText><p style={{fontSize: "16px"}}>* 이미 등록된 팀 명은 중복될 수 없습니다.</p></Dropdown.ItemText>
                        </DropdownButton>
                        <Button variant="primary" type="submit" className="team_btn" onClick={handleTeam}>
                            팀 등록하기
                        </Button>
                    </div>
                </Container>
            </Form>
        </Container>) : (
        <LoadingSpinner/>
    );
};
