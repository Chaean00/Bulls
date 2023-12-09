import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ShowAlert} from "./ShowAlert";
import axios from "axios";
import CryptoJs from "crypto-js";
import {LoadingSpinner} from "./LoadingSpinner";

export const MatchDetail = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [loading, setLoading] = useState(false);
    const [board, setBoard] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    const getDetailBoard = async () => {
        try {
            const response = await axios.get(`/match/boardlist/${parseInt(id)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + CryptoJs.AES.decrypt(localStorage.getItem("token"), process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8)
                }
            });
            if (response.status === 200) {
                setBoard(response.data);
                setLoading(true);
                console.log(response.data);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("loggedIn")
                ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
            } else if (error.response?.status === 403) {
                ShowAlert("403", "403", "error", "/", navigate)
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
        getDetailBoard()
    },[])

    return loading ?
        (
            <Container>
                <Container>
                    <h3>{board.matchPlace}</h3>
                </Container>

                <strong>{board.matchDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{board.matchTime}</strong>
            </Container>
        ) : (
            <LoadingSpinner/>
        )
}