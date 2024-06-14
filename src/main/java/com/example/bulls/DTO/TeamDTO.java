package com.example.bulls.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TeamDTO {
    private String teamName;
    private String teamIntroduce;
    private String teamArea;
    private String teamPhone;
    private String teamCaptain;
}
