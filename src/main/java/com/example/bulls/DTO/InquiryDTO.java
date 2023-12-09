package com.example.bulls.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InquiryDTO {
    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    @NotBlank(message = "이름을 입력해주세요")
    private String name;
    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
    private String phone;
    @NotBlank(message = "이메일을 입력해주세요")
    @Email
    private String email;
    @NotBlank(message = "본문을 입력해주세요")
    private String body;
}
