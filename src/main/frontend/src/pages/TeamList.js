import {Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {ShowAlert} from "../components/ShowAlert";
import axios from "axios";
import CryptoJs from "crypto-js";
import {useNavigate} from "react-router-dom";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {RemoveData} from "../components/RemoveData";

export const TeamList = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const navigate = useNavigate();
    const [teamList, setTeamList] = useState([]);
    const [loading, setLoading] = useState(false);
    const getTeamList = async () => {
        try {
            const response = await axios.get("/team/list", {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
                }
            }).then()
            if (response.status === 200) {
                setTeamList(response.data);
                setLoading(true);
                console.log("성공");
            } else {
                console.log(response.status);
                console.log("실패")
            }
        } catch (error) {
            if (error.response?.status === 401) {
                RemoveData();
                ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            }
            console.log(error);
        }
    }
    useEffect(() => {
        if (!loggedIn) {
            localStorage.removeItem("token");
            localStorage.removeItem("loggedIn")
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
        getTeamList();
    }, [loggedIn])

    return loading ? (
        <Container>
            {teamList.map((team, index) => (
                <>
                    <Card key={index}>
                        <Card.Header>{team.teamName}</Card.Header>
                        <Card.Body>
                            <Card.Title>{team.nickname}</Card.Title>
                            <Card.Text>
                                팀 소개: {team.teamIntroduce}<br/>
                                팀 위치: {team.teamArea}<br/>
                                팀 연락처: {team.teamPhone}<br/>
                                팀 대표: {team.teamCaptain}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <br/>
                </>
            ))}
        </Container>
    ) : (
        <LoadingSpinner/>
    );
}