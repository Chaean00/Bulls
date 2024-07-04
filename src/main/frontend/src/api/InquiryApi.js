import axios from "axios";
import {ShowAlert} from "../utils/ShowAlert";

// 문의 생성 API
export const InquiryCreate = async (navigate, inquiry, setInquiry) => {
    try {
        const response = await axios.post("/inquiry/new", JSON.stringify(inquiry), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 200) {
            ShowAlert("문의 완료", "문의 해주셔서 감사합니다", "success", "/", navigate)
            setInquiry({
                title: "",
                name: "",
                phone: "",
                email: "",
                body: ""
            })
        }
    } catch (error) {
        if (error.response?.status === 400) {
            ShowAlert("형식이 올바르지 않습니다.", "다시 입력해주세요", "error", "/inquiry", navigate)
        }
        if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate)
        }
    }
}