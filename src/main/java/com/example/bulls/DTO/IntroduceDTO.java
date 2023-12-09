package com.example.bulls.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IntroduceDTO {
    @NotBlank(message = "uid가 비어있어요")
    private String uid;
    @NotBlank(message = "introduce is null")
    private String introduce;
}
