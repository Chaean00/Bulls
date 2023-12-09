import { Container, Image, Row, Col } from "react-bootstrap";
import "../styles/HomeMain.scss";
import Ball1 from "../images/ball1.png";
import Ball2 from "../images/ball2.png";
import Ball3 from "../images/ball3.png";

export const HomeMain = () => {
    return (
        <>
            <Container className="d-flex flex-column align-items-center">
                <br />
                <p>축구 하고싶은 당신! 상대 팀을 못구하고있다면?</p>
                <h2>
                    Bulls FootBall을 통해 상대 팀을 구해보세요.
                </h2>
                <br />
                <p>이제 망설일 필요가 없습니다.</p>
            </Container>
            <Container>
                <Row className="justify-content-center">
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball1}
                            style={{ width: "200px", height: "200px" }}
                            className="homemain_image"
                        ></Image>
                        <strong>심판에 대한 존중</strong>
                        <p>심판에 판정에 대해 항상 존중해주고 <br/>공격적인 행동, 비판적인 태도는 하지말아주세요!</p>
                    </Col>
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball2}
                            style={{ width: "200px", height: "200px" }}
                            className="homemain_image"
                        ></Image>
                        <strong>상대 존중</strong>
                        <p>서로 인사를 나누고 넘어지면 일으켜주거나 <br/>상대방이 다칠 정도의 몸싸움은 피해주세요!</p>
                    </Col>
                    <Col className="d-flex flex-column m-3 align-items-center">
                        <Image
                            src={Ball3}
                            style={{ width: "200px", height: "200px" }}
                            className="homemain_image"
                        ></Image>
                        <strong>승리와 패배</strong>
                        <p>승리는 겸손하게 자축하고 패배는 배울 수 있는 기회로 삼으며 매너를 지켜주세요!</p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
