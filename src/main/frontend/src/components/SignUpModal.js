import { useState } from "react";
import {Modal, Button, Form, Col, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Signup} from "../api/Api";

const SignUpModal = ({ showModal, handleCloseModal }) => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        uid: "",
        password: "",
        email: "",
        name: "",
        nickname: "",
        introduce: "본인을 소개해주세요"
    });
    const [showAlert, setShowAlert] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        if (user.password !== confirmPassword) {
            setShowAlert(true) // 오류메세지 보여주기
            return;
        }
        await Signup(navigate, user, handleCloseModal)

        setUser({
            userId: "",
            password: "",
            userName: "",
            email: "",
            nickName: "",
        });
        setConfirmPassword("");
    };

    const handleCloseBtn = () => {
        handleCloseModal();
        setUser({
            uid: "",
            password: "",
            email: "",
            name: "",
            nickname: "",
        });
        setConfirmPassword("");
        setValidated(false);
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="아이디를 입력해주세요"
                                    name="uid"
                                    value={user.uid}
                                    onChange={handleInput}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    아이디를 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInput}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 다시 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInput}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    이름을 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col sm>
                                <Form.Control
                                    type="email"
                                    placeholder="이메일을 입력해주세요"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    이메일을 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Col sm>
                                <Form.Control
                                    type="text"
                                    placeholder="닉네임을 입력해주세요"
                                    name="nickname"
                                    value={user.nickname}
                                    onChange={handleInput}
                                    className="input_box"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    닉네임을 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Alert show={showAlert} variant="danger">
                            비밀번호가 같지 않습니다.
                        </Alert>
                        <div className="d-grid gap-1">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSignUp}
                                className="input_box"
                            >
                                회원가입
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBtn}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignUpModal;
