import {Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import "../styles/About.scss"
import AOS from "aos"
import 'aos/dist/aos.css'
import {KakaoMap} from "../components/KakaoMap";
import Mysql_Logo from "../images/skills_logo/mysql_icon.png"
import Spring_Logo from "../images/skills_logo/spring_icon.png"
import React_Logo from "../images/skills_logo/react_icon.png"
import Rds_Logo from "../images/skills_logo/rds_icon.png"
import Kim from "../images/profile/kim.jpeg"
import Min from "../images/profile/min.jpeg"
import Ryu from "../images/profile/ryu.jpeg"


export const About = () => {
    const [selectedImage, setSelectedImage] = useState("");

    const handleMouseEnter = (e) => {
        setSelectedImage(e.target.alt);
    };

    const handleMouseLeave = () => {
        setSelectedImage("");
    };

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
            <Container>
                <Container className="aboutUs_container">
                    <h1 className="aboutUs_text">About Us</h1>
                </Container>
                <Container>
                    <h2 className="used_text">We used</h2>
                </Container>
                <Container className="skills_container">
                    <img src={Mysql_Logo} alt="Mysql Logo" className={`mysql_logo ${selectedImage === "Mysql Logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}/>
                    <img src={Spring_Logo} alt="Spring logo" className={`spring_logo ${selectedImage === "Spring logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}/>
                    <img src={React_Logo} alt="React logo" className={`react_logo ${selectedImage === "React logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}/>
                    <img src={Rds_Logo} alt="Rds logo" className={`rds_logo ${selectedImage === "Rds logo" ? "selected" : ""} skill`} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}/>
                </Container>
                <Container className="introduce_container">
                    <div className="role" data-aos="fade-right">
                        <p>Front-End&nbsp;&nbsp;&nbsp;&nbsp;Design</p>
                    </div>
                    <Container data-aos="fade-right" className="profile_container">
                        <img src={Min} alt="Min" className="profile_img"/>
                        <div className="profile_text">
                            <div>
                                <h4 className="sub_text">Name</h4>
                                <p>민나영</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Major</h4>
                                <p>대진대학교 3학년 컴퓨터공학전공</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Email</h4>
                                <p>20212149@daejin.ac.kr</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Student ID</h4>
                                <p>20212149</p>
                            </div>
                        </div>
                    </Container>
                </Container>

                <Container className="introduce_container">
                    <div className="role" data-aos="fade-left">
                        <p>Front-End&nbsp;&nbsp;&nbsp;&nbsp;Back-End&nbsp;&nbsp;&nbsp;&nbsp;Design</p>
                    </div>
                    <Container data-aos="fade-left" className="profile_container">
                        <img src={Kim} alt="Kim" className="profile_img"/>
                        <div className="profile_text">
                            <div>
                                <h4 className="sub_text">Name</h4>
                                <p>김정택</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Major</h4>
                                <p>대진대학교 3학년 컴퓨터공학전공</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Email</h4>
                                <p>jtkim965@naver.com</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Student ID</h4>
                                <p>20191479</p>
                            </div>
                        </div>
                    </Container>
                </Container>
                <Container className="introduce_container">
                    <div className="role" data-aos="fade-right">
                        <p>Front-End&nbsp;&nbsp;&nbsp;&nbsp;Back-End</p>
                    </div>
                    <Container data-aos="fade-right" className="profile_container">
                        <img src={Ryu} alt="Ryu" className="profile_img"/>
                        <div className="profile_text">
                            <div>
                                <h4 className="sub_text">Name</h4>
                                <p>류희수</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Major</h4>
                                <p>대진대학교 3학년 컴퓨터공학전공</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Email</h4>
                                <p>hs201016@naver.com</p>
                            </div>
                            <div>
                                <h4 className="sub_text">Student ID</h4>
                                <p>20191303</p>
                            </div>
                        </div>
                    </Container>
                </Container>
            </Container>
            <div className="kakao_map">
                <h4 className="kakao_map_title">We Work in</h4>
                <KakaoMap/>
            </div>
        </>
    )
};
