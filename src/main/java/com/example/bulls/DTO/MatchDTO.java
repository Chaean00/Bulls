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


//    public MatchPost toEntity() { // id 값은 자동으로 증가하려고 null 로 주는 방법도 있음.
//        return new MatchPost(id,matchTime,matchDate,postTime,postDate,place,matchPlace,matchPrice,
//                level,canParking,matchStatus,numPerson,matchContact,mainText, nickname);
//    }
}
