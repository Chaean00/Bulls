package com.example.bulls.Controller;

import com.example.bulls.DTO.MatchDTO;
import com.example.bulls.Service.TeamService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping
@Slf4j
public class BoardController {

    @Autowired
    private TeamService teamService;

    // 매치 전체 읽기
    @GetMapping("/match/boardlist")
    @ResponseBody
    public ResponseEntity<List<MatchDTO>> getAllBoards() {
        try {
            return ResponseEntity.ok(teamService.getAllBoard());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // 매치 세부사항 읽기
    @GetMapping("/match/boardlist/{id}")
    @ResponseBody
    public ResponseEntity<MatchDTO> getBoardDetailByID(@PathVariable(value = "id") Integer id) {

        Optional<MatchDTO> matchDTO = teamService.getBoardDetail(id);

        if (matchDTO.isPresent()) {
            return ResponseEntity.ok(matchDTO.get());
        }

        // 404 error
        return ResponseEntity.notFound().build();
    }


    // 매치 생성
    @PostMapping("/match/addmatch/create")
    @ResponseBody
    public ResponseEntity<String> newArticleAddForm(@Validated @RequestBody MatchDTO matchDTO) {
        Boolean response = teamService.savedBoard(matchDTO);
        if (response) {
            return ResponseEntity.ok("매칭 등록에 성공하였습니다.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("매칭 등록에 실패하였습니다.");
    }

    // 매치 수정
    @PutMapping("/match/addmatch/create/{id}")
    @ResponseBody
    public ResponseEntity<Boolean> updateBoard(@PathVariable(value = "id") Integer id, @RequestBody MatchDTO matchDTO) {
        boolean flag = teamService.updateBoard(id, matchDTO);
        if (flag) {
            return ResponseEntity.ok(true);
        }

        return ResponseEntity.notFound().build();
    }


    // 매치 삭제
    @DeleteMapping("/match/boardlist/{id}")
    @ResponseBody
    public void deleteBoardByID(@PathVariable(value = "id") Integer id) {
        teamService.deleteBoard(id);
    }

    // 매치 상태 변경
    @GetMapping("/match/update/{id}")
    @ResponseBody
    public ResponseEntity<String> matchFinished(@PathVariable(value = "id") Integer id) {
        if(teamService.matchFinished(id)) {
            return ResponseEntity.ok("변경 성공.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("변경 실패.");
    }
}
