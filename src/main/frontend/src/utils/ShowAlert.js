import Swal from "sweetalert2";

export const ShowAlert = (title, text, icon, url, navigate) => {
    Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: `${icon}`,
        confirmButtonText: "확인",
    }).then((result) => {
        if (result.isConfirmed) {
            navigate(`${url}`)
        } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc) {
            navigate(`${url}`)
        }
    })
}