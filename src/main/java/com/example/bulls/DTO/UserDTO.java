package com.example.bulls.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    @NotBlank(message = "아이디를 입력해주세요")
    private String uid;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;
    @NotBlank(message = "이메일을 입력해주세요")
    @Email(message = "올바른 이메일 주소를 입력해주세요")
    private String email;
    @NotBlank(message = "이름을 입력해주세요")
    private String name;
    @NotBlank(message = "닉네임을 입력해주세요")
    private String nickname;
    private String introduce;

}
