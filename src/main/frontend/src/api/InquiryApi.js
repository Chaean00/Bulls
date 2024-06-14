// import CryptoJs from "crypto-js";
import axios from "axios";
import {ShowAlert} from "../components/ShowAlert";
import {RemoveData} from "../components/RemoveData";

// let decrtyToken = null;
// const token = localStorage.getItem("token");
//
// if (token) {
//     decrtyToken = CryptoJs.AES.decrypt(token, process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8);
// } else {
//     console.log("Token이 존재하지 않습니다.");
// }

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
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
        if (error.response?.status === 400) {
            ShowAlert("형식이 올바르지 않습니다.", "다시 입력해주세요", "error", "/inquiry", navigate)
        }
        if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate)
        }
    }
}