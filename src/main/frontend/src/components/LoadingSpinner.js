import {Container, Spinner} from "react-bootstrap";

export const LoadingSpinner = () => {
    return (
        <Container className="d-flex flex-column align-items-center" style={{marginTop: "300px", marginBottom: "300px"}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}