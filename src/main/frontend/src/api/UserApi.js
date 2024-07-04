import axios from "axios";
import CryptoJs from "crypto-js";
import {ShowAlert} from "../utils/ShowAlert";
import Swal from "sweetalert2";
import {GetTeam} from "./TeamApi";
import instance from "./axios";

let decrtyToken = null;
const access_token = localStorage.getItem("access_token");

if (access_token) {
    decrtyToken = CryptoJs.AES.decrypt(access_token, process.env.REACT_APP_SECRET_KEY).toString(CryptoJs.enc.Utf8);
} else {
    console.log("Token이 존재하지 않습니다.");
}

// 로그인 API
export const SignIn = async (navigate, signinData, setSigninData, handleCloseModal, setShowAlert) => {
    try {
        const response = await axios.post("/user/signin", JSON.stringify(signinData), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
            const token = response.headers.get("Authorization").split(' ')[1];

            console.log(token);

            // JWT 토큰 암호화
            const encryption = CryptoJs.AES.encrypt(token, process.env.REACT_APP_SECRET_KEY);

            localStorage.setItem("access_token", encryption);
            localStorage.setItem("loggedIn", true);
            // id, pw 입력 칸 초기화
            setSigninData({
                uid: "",
                password: "",
            });
            // 로그인 모달창 닫기
            handleCloseModal();
            // 알림창 닫기
            setShowAlert(false);
            // 알림창이 꺼지면 "/"(웰컴페이지)로 이동
            Swal.fire({
                title: "로그인이 완료되었습니다.",
                text: "환영 합니다.",
                icon: `success`,
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/";
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    window.location.href = "/";
                }
            })
            navigate('/')
        }
    } catch (error) {
        if (error.response?.status === 400) {
            setShowAlert(true);
        }
    }
}

// 회원가입 API
export const Signup = async (navigate, user, handleCloseModal) => {
    try {
        const response = await axios.post("/user/new", JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 200) {
            ShowAlert("회원가입이 완료되었습니다.", "환영합니다.", "success", "/", navigate)
            Swal.fire({
                title: "회원가입이 완료되었습니다.",
                text: "환영합니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleCloseModal();
                    window.location.href = "/";
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    handleCloseModal();
                    window.location.href = "/";
                }
            })
            handleCloseModal();
        }
    } catch (error) {
        if (error.response?.status === 400) {
            ShowAlert("형식이 올바르지 않습니다.", "다시 입력해주세요", "error", "/inquiry", navigate)
        }
        if (error.response?.status === 403) {
            Swal.fire("403", "403", "error");
        }
    }
}

// 본인 정보 조회 API
export const GetUser = async (navigate, setUser, setTeam, setLoading) => {
    try {
        const response = await instance.get("/user/info");
        if (response.status === 200) {
            setUser(response.data);
            await GetTeam(setTeam, setLoading);
        }
    } catch (error) {
        if (error.response?.status === 400) {
            ShowAlert("형식이 올바르지 않습니다.", "다시 입력해주세요", "error", "/", navigate);
        }
        if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate);
        }
    }
}
// export const GetUser = async (navigate, setUser, setTeam, setLoading) => {
//     try {
//         const response = await axios.get("/user/info",{
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": "Bearer " + decrtyToken
//             }
//         })
//         if (response.status === 200) {
//             setUser(response.data);
//             await GetTeam(setTeam, setLoading, navigate);
//         }
//     } catch (error) {
//         if (error.response?.status === 401) {
//             reissue(navigate);
//         }
//         if (error.response?.status === 400) {
//             ShowAlert("형식이 올바르지 않습니다.", "다시 입력해주세요", "error", "/", navigate)
//         }
//         if (error.response?.status === 403) {
//             ShowAlert("403", "403", "error", "/", navigate);
//         }
//     }
// }



// 유저 소개 업데이트
export const UpdateIntroduce = async (user) => {
    try {
        const response = await instance.put("/user/updateintroduce", JSON.stringify(user));
        if (response.status === 200) {
            Swal.fire({
                title: "소개 수정 완료.",
                text: "감사합니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/user/info"
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    window.location.href = "/user/info"
                }
            })
        }
    } catch (error) {
        if (error.response?.status === 403) {
            Swal.fire("403", "403", "error");
            console.log(error.response)
        } else {
            Swal.fire("알수 없는 오류", "죄송합니다.", "error");
        }
    }
}
// export const UpdateIntroduce = async (user, navigate) => {
//     try {
//         const response = await axios.put("/user/updateintroduce", JSON.stringify(user), {
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Authorization": "Bearer " + decrtyToken
//             }
//         })
//         if (response.status === 200) {
//             Swal.fire({
//                 title: "소개 수정 완료.",
//                 text: "감사합니다.",
//                 icon: "success",
//                 confirmButtonText: "확인",
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     window.location.href = "/user/info"
//                 } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
//                     window.location.href = "/user/info"
//                 }
//             })
//         }
//     } catch (error) {
//         if (error.response?.status === 401) {
//             RemoveData();
//             ShowAlert("로그인 시간이 만료되었습니다", "로그인 후 이용해주세요", "error", "/", navigate)
//         } else if (error.response?.status === 403) {
//             Swal.fire("403", "403", "error");
//             console.log(error.response)
//         } else {
//             Swal.fire("알수 없는 오류", "죄송합니다.", "error");
//         }
//     }
// }