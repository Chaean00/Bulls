package com.example.bulls.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SigninDTO {
    @NotBlank(message = "아이디을 입력해주세요")
    private String uid;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

}
