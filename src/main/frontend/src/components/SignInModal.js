import {useState} from "react";
import {Modal, Form, Col, Button, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {SignIn} from "../api/Api";

export const SignInModal = ({ showModal, handleCloseModal }) => {

    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [signinData, setSigninData] = useState({
        uid: "",
        password: "",
    });

    const handleInput = (e) => {
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCloseBtn = () => {
        handleCloseModal();
        setSigninData({
            userId: "",
            password: "",
        });
        setValidated(false);
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (!signinData.uid || !signinData.password) {
            setValidated(true)
        } else {
            SignIn(navigate, signinData, setSigninData, handleCloseModal, setShowAlert);
        }
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
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
                                    placeholder="아이디를 입력해주세요."
                                    name="uid"
                                    value={signinData.uid}
                                    onChange={handleInput}
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
                                    value={signinData.password}
                                    onChange={handleInput}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력 해주세요.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Alert show={showAlert} variant="danger">
                            계정이 존재하지 않거나 비밀번호가 일치하지 않습니다.
                        </Alert>
                        <div className="d-grid gap-1">
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSignin}
                            >
                                로그인
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
