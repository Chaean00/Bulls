package com.example.bulls.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment
    private Long id;
    @Column(name = "uid", unique = true)
    private String uid;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "name")
    private String name;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "roles")
    private String roles; // 역할(권한)
    @Column(name = "introduce")
    private String introduce;
    @ManyToOne
    private Team team;
}
