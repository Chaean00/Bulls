package com.example.bulls.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInfoDTO {
    private String uid;
    private String name;
    private String introduce;
    private String email;
    private String nickname;
}
