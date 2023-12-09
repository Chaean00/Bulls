import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "../styles/Footer.scss";
import "bootstrap-icons/font/bootstrap-icons.css";


export const Footer = () => {

    return (
        <MDBFooter id="footer" className="text-center text-lg-start text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a
                        href="https://www.instagram.com/bulls_dj2023/"
                        className="me-4 text-reset"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a
                        href="mailto:bulls0191@gmail.com"
                        className="me-4 text-reset"
                    >
                        <i className="bi bi-google"></i>
                    </a>
                    <a
                        href="https://open.kakao.com/o/gMHCvoSf"
                        className="me-4 text-reset"
                    >
                        <i className="bi bi-chat-dots-fill"></i>
                    </a>
                </div>
            </section>

            <section className="">
                <MDBContainer className="text-center text-md-start mt-5">
                    <MDBRow className="mt-3">
                        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="bi bi-gem"></i>
                                &nbsp;&nbsp;&nbsp;Bulls FootBall
                            </h6>
                            <p>
                                Experience diverse soccer matches and build connections with fellow football enthusiasts through Bulls Football.
                                Anyone who loves and enjoys soccer is welcome to join and create new friendships and connections on our platform.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Skills
                            </h6>
                            <p>
                                <a
                                    href="https://ko.legacy.reactjs.org/"
                                    className="text-reset"
                                >
                                    React
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://sass-lang.com/"
                                    className="text-reset"
                                >
                                    Sass / Scss
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://mdbootstrap.com/"
                                    className="text-reset"
                                >
                                    MDB
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://spring.io/"
                                    className="text-reset"
                                >
                                    Spring
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Help
                            </h6>
                            <p>
                                <a href="/match/registration" className="text-reset">
                                    매칭 등록
                                </a>
                            </p>
                            <p>
                                <a href="/team/registration" className="text-reset">
                                    팀 등록
                                </a>
                            </p>
                            <p>
                                <a href="/inquiry" className="text-reset">
                                    문의하기
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol
                            md="4"
                            lg="3"
                            xl="3"
                            className="mx-auto mb-md-0 mb-4"
                        >
                            <h6 className="text-uppercase fw-bold mb-4">
                                Contact
                            </h6>
                            <p>
                                <i className="bi bi-house-door-fill"></i>
                                &nbsp;&nbsp;Gyeonggi-do
                            </p>
                            <p>
                                <i className="bi bi-envelope-fill"></i>
                                &nbsp;&nbsp;bulls0191@gmail.com
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div
                className="text-center p-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
                © 2021 Copyright:
                <a
                    className="text-reset fw-bold"
                    href="/"
                >
                    Bulls FootBall
                </a>
            </div>
        </MDBFooter>
    );
};
