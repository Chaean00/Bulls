package com.example.bulls.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "team")
@Getter
@Setter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "team_name")
    private String teamName;
    @Column(name = "team_introduce")
    private String teamIntroduce;
    @Column(name = "team_area")
    private String teamArea;
    @Column(name = "team_phone")
    private String teamPhone;
    @Column(name = "team_captain")
    private String teamCaptain;
    @OneToMany(mappedBy = "team")
    private List<User> users = new ArrayList<>();

    public void addUser(User user) {
        this.users.add(user);
        user.setTeam(this);
    }
}
