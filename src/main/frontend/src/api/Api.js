import axios from "axios";
import CryptoJs from "crypto-js";
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

// 글 삭제 API
export const DeleteBoard = async (id, navigate) => {
    try {
        const response = await axios.delete(`/match/boardlist/${parseInt(id)}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            ShowAlert("글을 삭제하였습니다.", "감사합니다.", "success", "/match/list", navigate);
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate)
        }
        console.log(error);
    }

}

// 매칭 상태 변경 API
export const MatchingFinished = async (id, navigate) => {
    try {
        const response = await axios.get(`/match/update/${parseInt(id)}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            ShowAlert("매칭상태를 변경했습니다.", "감사합니다.", "success", "/match/list", navigate);
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
        } else if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate)
        }
        console.log(error);
    }
}

// 글 세부사항 조회 API
export const DetailBoard = async (id, navigate, setBoard, setLoading, setBoardWriter, setIsFinished) => {
    try {
        const response = await axios.get(`/match/boardlist/${parseInt(id)}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        });
        if (response.status === 200) {
            setBoard(response.data);
            setLoading(true);
            console.log(response.data)
            if (localStorage.getItem("nickname") === response.data.nickname) {
                setBoardWriter(true);
            }
            if (response.data.matchStatus === "매칭 마감") {
                setIsFinished(true);
            }
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate);
        } else if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate);
        } else {
            ShowAlert("알 수 없는 오류.", "죄송합니다.", "error", "/", navigate);
        }
    }
}

// 글 수정 API
export const UpdateBoard = async (id, navigate, inputs, handleCloseModal) => {
    try {
        const response = await axios.put(`/match/addmatch/create/${parseInt(id)}`, JSON.stringify(inputs),{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            Swal.fire({
                title: "수정이 완료되었습니다.",
                text: "감사합니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleCloseModal();
                    navigate("/match/list")
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    handleCloseModal();
                    navigate("/match/list")
                }
            })
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate);
        } else if (error.response?.status === 403) {
            ShowAlert("403", "403", "error", "/", navigate);
        } else {
            ShowAlert("알 수 없는 오류.", "죄송합니다.", "error", "/", navigate);
        }
    }
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
            const data = await response.data;
            // JWT 토큰 암호화
            const encryption = CryptoJs.AES.encrypt(data.access, process.env.REACT_APP_SECRET_KEY);
            localStorage.setItem("token", encryption);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("nickname", response.data.nickname);
            // localStorage.setItem("nickname", )
            setSigninData({
                uid: "",
                password: "",
            });
            handleCloseModal();
            setShowAlert(false);
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
        } else {
            console.log("로그인 실패")
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
        } else {
            console.error('ERROR = ', response.status);
        }
    } catch (error) {
        console.log("error", error)
    }
}

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
            Swal.fire("403", "403", "error");
        }
        console.log("Error = " + error)
    }
}

// 매치 조회 API
export const GetMatchList = async (navigate, setMatchList, setLoading) => {
    try {
        const response = await axios.get("/match/boardlist", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        });
        if (response.status === 200) {
            setMatchList(response.data);
            setLoading(true);
        }
    } catch (error) {
        if (error.response?.status === 401) {
            RemoveData();
            ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate);
        }
        if (error.response?.status === 403) {
            ShowAlert("403", "dyrlsrk", "error", "/", navigate);
        } else {
            ShowAlert("알 수 없는 오류.", "죄송합니다.", "error", "/", navigate);
        }
    }
}

// 매치 등록 API
export const MatchCreate = async (navigate, inputs) => {
    try {
        const response = await axios.post("/match/addmatch/create", JSON.stringify(inputs), {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            ShowAlert("매칭 등록이 완료되었습니다.", "감사합니다.", "success", "/", navigate)
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
export const GetTeam = async (setTeam, setLoading) => {
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
        setTeam(null);
        setLoading(true);
        console.log(error);
    }
}
// 본인 정보 조회 API
export const GetUser = async (navigate, setUser, setTeam, setLoading, newIntroduce, setNewIntroduce) => {
    try {
        const response = await axios.get("/user/info",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + decrtyToken
            }
        })
        if (response.status === 200) {
            setUser(response.data);
            setNewIntroduce({
                ...newIntroduce,
                uid: response.data.uid
            })
            await GetTeam(setTeam, setLoading);
        }
    } catch (error) {
        RemoveData();
        ShowAlert("권한이 없습니다", "로그인 후 이용해주세요", "error", "/", navigate)
    }
}

// 팀 탈퇴 API
export const DeleteTeam = async () => {
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
    } else {
        console.log(response.status);
    }
}

export const UpdateIntroduce = async (newIntroduce) => {
    const response = await axios.post("/user/updateintroduce", JSON.stringify(newIntroduce), {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + decrtyToken
        }
    })
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
    } else {
        console.log(response.status);
    }
}