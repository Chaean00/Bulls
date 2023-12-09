package com.example.bulls.Repository;

import com.example.bulls.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByTeamName(String team_name);
    Optional<Team> findByNickname(String nickname);
}
