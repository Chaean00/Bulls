package com.example.bulls.DTO;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;


/**
 *  Entity -> repository 의 타입변환
 */


@Data
@Builder
public class MatchDTO {

    private Long id;
    private LocalTime matchTime;
    private LocalDate matchDate;
    private LocalTime postTime;
    private LocalDate postDate;
    private String place;
    private String matchPlace;
    private int matchPrice;
    private String level;
    private String canParking;
    private String  matchStatus;
    private String numPerson;
    private String matchContact;
    private String mainText;
    private String nickname;
    private boolean canEdit;

}
