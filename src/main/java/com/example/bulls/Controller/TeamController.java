package com.example.bulls.Controller;

import com.example.bulls.DTO.TeamDTO;
import com.example.bulls.Service.TeamService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Slf4j
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping("/team/new")
    public ResponseEntity<String> teamRegister(@Valid @RequestBody TeamDTO teamDTO) {
        if (teamService.teamRegister(teamDTO)) {
            return ResponseEntity.ok("팀 등록이 완료되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("팀 등록에 실패하였습니다.");
    }

    // 로그인한 유저의 정보를 반환
    @GetMapping("/team/info")
    public ResponseEntity<TeamDTO> teamInfo() {
        TeamDTO teamInfo = teamService.teamInfo();
        if (teamInfo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 400
        }
        return ResponseEntity.ok(teamInfo); // 상태코드: 200 + user
    }

    @GetMapping("/team/delete")
    public ResponseEntity<String> teamDelete() {
        String success = teamService.teamDelete();

        return ResponseEntity.ok(success);
    }
}
