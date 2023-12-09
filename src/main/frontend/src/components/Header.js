import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../images/logo/LogoText.png"
import "../styles/Header.scss";
import {useState} from "react";
import SignUpModal from "./SignUpModal";
import { SignInModal } from "./SignInModal";
import Menu from "../images/menu.svg"
import {useNavigate} from "react-router-dom";
import {RemoveData} from "./RemoveData";

export const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("loggedIn") // 로그인 여부
    const [expanded, setExpanded] = useState(false); // 메뉴 보여주는지?




    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }; // 모바일인지 아닌지?
    const handleSignInOpenModal = () => {
        setShowSignInModal(true);
    };
    const handleSignInCloseModal = () => {
        setShowSignInModal(false);
    };
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const logout = () => {
        RemoveData();
        window.location.href = "/";
    }

    return (
        <Container className="header">
            <Navbar
                expand="lg"
                className="fixed-top navbar-custom"
                id="nav-bar"
                expanded={expanded}
            >
                <Container className="header_container">
                    <Navbar.Brand onClick={() => {
                        navigate("/");
                        setExpanded(false);
                    }} style={{cursor:"pointer"}}>
                        <img src={Logo} alt="로고" className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isMobile() ? (<Nav>
                            <Nav.Link onClick={() => {
                                navigate("/match/list");
                                setExpanded(false);
                            }}>
                                매칭 리스트
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                navigate("/about");
                                setExpanded(false);
                            }}>
                                About
                            </Nav.Link>
                            <Nav.Link  onClick={() => {
                                navigate("/inquiry");
                                setExpanded(false);
                            }}>
                                문의하기
                            </Nav.Link>
                        </Nav>) : (
                            <Nav className="me-auto">
                                <NavDropdown title={<img src={Menu} alt="Menu Icon" className="menu_icon"/>} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => {
                                        navigate('/match/list');
                                        setExpanded(false);
                                    }}>
                                        매칭 리스트
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => {
                                        navigate('/about');
                                        setExpanded(false);
                                    }}>
                                        About
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => {
                                        navigate("/inquiry");
                                        setExpanded(false);
                                    }}>
                                        문의하기
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => {
                                navigate("/team/registration");
                                setExpanded(false);
                            }}>
                                팀 등록
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                navigate("/match/registration")
                                setExpanded(false);
                            }}>
                                매칭 등록
                            </Nav.Link>

                            {loggedIn ? (
                                <Nav.Link onClick={() => {
                                    setExpanded(false);
                                    logout();
                                }}>
                                    로그아웃
                                </Nav.Link>) : (
                                    <>
                                        <Nav.Link onClick={() => {
                                            handleSignInOpenModal();
                                            setExpanded(false);
                                        }}>
                                            로그인
                                        </Nav.Link>
                                        <Nav.Link onClick={() => {
                                            handleOpenModal();
                                            setExpanded(false);
                                        }}>
                                            회원가입
                                        </Nav.Link>
                                    </>
                                )
                            }
                            <SignInModal
                                showModal={showSignInModal}
                                handleCloseModal={handleSignInCloseModal}
                            />

                            <SignUpModal
                                showModal={showModal}
                                handleCloseModal={handleCloseModal}
                            />
                            <Nav.Link onClick={() => {
                                navigate("/user/info");
                                setExpanded(false);
                            }}>
                                내정보
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
};
