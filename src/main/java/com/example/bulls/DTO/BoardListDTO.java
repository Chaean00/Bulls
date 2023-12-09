package com.example.bulls.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
public class BoardListDTO {


    private Integer id; // 고유 아이디
    private LocalTime matchTime; // 경기 시간
    private LocalDate matchDate; // 경기 날짜
    private String place; // 지역
    private String matchPlace; // 경기 장소
    private String numPerson; // 인원수
    private String matchStatus; // 매칭 상태
    private Integer matchPrice; // 구장 가격
    private String level; // 레벨
    private String canParking; // 주차 가능 여부
    private String nickname; // 닉네임
}
