import axios from "axios";
import CryptoJs from "crypto-js";
import {RemoveData} from "../utils/RemoveData";
import Swal from "sweetalert2";

/*
Refresh Token을 이용한 Access Token 재발급 API
Axios 인터셉터와 연동(?)
 */
export const reissue = async () => {
    try {
        const response = await axios.post("/reissue/accesstoken", JSON.stringify(""), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            const token = response.headers.get("Authorization").split(' ')[1];
            const encryption = CryptoJs.AES.encrypt(token, process.env.REACT_APP_SECRET_KEY)

            localStorage.setItem("access_token", encryption);
            return token;
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            Swal.fire({
                title: "로그인 시간이 만료되었습니다.",
                text: "다시 로그인 해주세요.",
                icon: `error`,
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/";
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    window.location.href = "/";
                }
            })
        }
    }
}