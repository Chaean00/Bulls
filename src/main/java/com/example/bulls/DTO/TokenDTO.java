package com.example.bulls.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenDTO {
    private String nickname;
    private String access;
}
