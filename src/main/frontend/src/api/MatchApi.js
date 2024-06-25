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
            ShowAlert("글을 삭제하였습니다.", "감사합니다.", "success", "/match/boardlist", navigate);
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
            ShowAlert("매칭상태를 변경했습니다.", "감사합니다.", "success", "/match/boardlist", navigate);
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
            // 수정할 수 있는가?
            if (response.data.canEdit) {
                setBoardWriter(true);
            }
            // 매칭이 마감되었는가?
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
                    navigate("/match/boardlist")
                } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
                    handleCloseModal();
                    navigate("/match/boardlist")
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
            ShowAlert("403", "403", "error", "/", navigate);
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
            ShowAlert("매칭 등록이 완료되었습니다.", "감사합니다.", "success", "/match/boardlist", navigate)
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