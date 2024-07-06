import {ShowAlert} from "../utils/ShowAlert";
import Swal from "sweetalert2";
import instance from "./axios";


// 팀 등록 API
export const TeamCreate = async (navigate, team) => {
    try {
        const response = await instance.post("/team/new", JSON.stringify(team));
        if (response.status === 200) {
            ShowAlert("팀 등록이 완료되었습니다.", "환영합니다.", "success", "/", navigate)
        }
    } catch (error) {
        if (error.response?.status === 400) {
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
        const reponse = await instance.get("/team/info");
        if (reponse.status === 200) {
            setTeam(reponse.data);
            setLoading(true);
        }
    } catch (error) {
        setTeam(null);
        setLoading(true);
        console.log(error);
    }
}

// 팀 탈퇴 API
export const DeleteTeam = async () => {
    try {
        const response = await instance.get("/team/delete");
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
        if (error.response?.status === 404) {
            Swal.fire("팀을 찾을 수 없습니다.", "다시 시도해주세요.", "error");
        }
        if (error.response?.status === 403) {
            Swal.fire("403", "403", "error");
            console.log(error.response)
        } else {
            Swal.fire("알수 없는 오류", "죄송합니다.", "error");
        }
    }
}