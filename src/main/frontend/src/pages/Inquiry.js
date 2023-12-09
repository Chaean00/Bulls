import {Container, Form,  Button} from "react-bootstrap";
import {useState} from "react";
import "../styles/Inquiry.scss"
import {useNavigate} from "react-router-dom";
import {InquiryCreate} from "../api/Api";

export const Inquiry = () => {
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState({
        title: "",
        name: "",
        phone: "",
        email: "",
        body: ""
    })
    const handleChange = (e) => {
        setInquiry({
            ...inquiry,
            [e.target.name]: e.target.value
        })

    }
    const handleInquiry = async (e) => {
        e.preventDefault()
        await InquiryCreate(navigate, inquiry, setInquiry);
    }

    return (
    <Container className="inquiry_container">
        <Form>
            <h3 className="inquiry_text">Contact Us</h3>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>제목</Form.Label>
                <Form.Control type="textarea" placeholder="문의 제목을 작성해주세요" name="title"
                              value={inquiry.title}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>이름</Form.Label>
                <Form.Control type="textarea" placeholder="이름을 작성해주세요" name="name"
                              value={inquiry.name}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>연락처</Form.Label>
                    <Form.Control type="textarea" placeholder="전화번호를 작성해주세요"
                              name="phone"
                              value={inquiry.phone}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일을 작성해주세요" name="email"
                              value={inquiry.email}
                              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>문의 내용</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="문의 내용을 작성해주세요" name="body"
                              value={inquiry.body}
                              onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleInquiry} className="inquiry_btn">
                문의하기
            </Button>
        </Form>
    </Container>);
};
