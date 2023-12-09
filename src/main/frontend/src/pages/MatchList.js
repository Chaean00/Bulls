import {useEffect, useState} from "react";
import {ShowAlert} from "../components/ShowAlert";
import {Link, useNavigate} from "react-router-dom";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {Badge, Container, FormCheck, ListGroup} from "react-bootstrap";
import "../styles/MatchList.scss"
import {RemoveData} from "../components/RemoveData";
import {GetMatchList} from "../api/Api";

export const MatchList = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [matchList, setMatchList] = useState([]);
    const [hideFinished, setHideFinished] = useState(false);


    useEffect(() => {
        if (!loggedIn) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else {
            GetMatchList(navigate, setMatchList, setLoading);
        }
    }, [loggedIn])



    return loading ? (
        <Container className="list_container">
            <FormCheck
                type="checkbox"
                checked={hideFinished}
                onChange={e => setHideFinished(e.target.checked)}
                label={"매칭 마감 가리기"}
            />
            <br/>
            {matchList.filter(match => {
                const matchDate = new Date(match.matchDate);
                matchDate.setHours(0, 0, 0, 0);

                const todayDate = new Date();
                todayDate.setHours(0, 0, 0, 0);

                return matchDate >= todayDate;
            }).filter(match => !hideFinished || match.matchStatus !== "매칭 마감")
                .map((match, index) => (
                <Link to={`/match/detail/${match.id}`} key={index} className="list_link">
                    <ListGroup as="ol">
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="list_matchTime">
                                {match.matchDate.slice(5)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{match.matchTime.slice(0, 5)}
                            </div>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{match.matchPlace} - {match.place}</div>
                                <div className="list_subText"><span style={{ color: 'red' }}>&middot;</span> {match.numPerson} &middot; {match.level} &middot; {match.canParking}</div>
                            </div>
                            <Badge bg={match.matchStatus === "매칭 마감" ? "danger" : "primary"} pill>
                                {match.matchStatus}
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                    <br/>
                </Link>
            ))}
        </Container>
    ) : (
        <LoadingSpinner/>
    )
}