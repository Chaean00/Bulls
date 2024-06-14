import CryptoJs from "crypto-js";
import axios from "axios";
import {ShowAlert} from "../components/ShowAlert";
import {RemoveData} from "../components/RemoveData";
import Swal from "sweetalert2";

let decrtyToken = null;
const token = localStorage.getItem("token");

if (token) {
    decrtyToken = CryptoJs.AES.decrypt(token, process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8);
} else {
    console.log("Token이 존재하지 않습니다.");
}
// 팀 등록 API
export const TeamCreate = async (navigate, team) => {
    try {
        const response = await axios.post("/team/new", JSON.stringify(team), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            },
        })
        if (response.status === 200) {
            ShowAlert("팀 등록이 완료되었습니다.", "환영합니다.", "success", "/", navigate)
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else if (error.response?.status === 400) {
            Swal.fire("이미 존재하는 팀 명입니다.", "다시 시도해주세요.", "error");
        } else if (error.response?.status === 409) {
            Swal.fire("이미 팀을 등록하셨습니다.", "팀은 하나만 등록할 수 있습니다.", "error");
        } else {
            Swal.fire("알수 없는 오류", "", "error");
        }
    }
}

// 본인 팀 조회 API
export const GetTeam = async (setTeam, setLoading, navigate) => {
    try {
        const response = await axios.get("/team/info", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        });
        if (response.status === 200) {
            setTeam(response.data);
            setLoading(true);
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        }
        setTeam(null);
        setLoading(true);
        console.log(error);
    }
}

// 팀 탈퇴 API
export const DeleteTeam = async (navigate) => {
    try {
        const response = await axios.get("/team/delete",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            Swal.fire({
                title: "팀 탈퇴가 완료되었습니다.",
                text: "감사합니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/user/info";
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    window.location.href = "/user/info";
                }
            })
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else if (error.response?.status === 403) {
            Swal.fire("403", "403", "error");
            console.log(error.response)
        } else {
            Swal.fire("알수 없는 오류", "죄송합니다.", "error");
        }
    }
}