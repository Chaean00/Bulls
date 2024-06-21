package com.example.bulls.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@Entity
@Table(name = "match_post")
@NoArgsConstructor
@AllArgsConstructor
public class MatchPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "match_time")
    private LocalTime matchTime;

    @Column(name = "matching_date")
    private LocalDate matchDate;

    @Column(name = "post_time")
    private LocalTime postTime;

    @Column(name = "post_date")
    private LocalDate postDate;

    @Column(name = "place")
    private String place;

    @Column(name = "match_place")
    private String matchPlace;

    @Column(name = "match_price")
    private int matchPrice;

    @Column(name = "level")
    private String level;

    @Column(name = "can_parking")
    private String canParking;

    @Column(name = "match_status")
    private String matchStatus;

    @Column(name = "num_person")
    private String numPerson;

    @Column(name = "match_contact")
    private String matchContact;

    @Column(name = "main_text")
    private String mainText;

    @Column(name = "nickname")
    private String nickname;

    @ManyToOne
    private User user;
}