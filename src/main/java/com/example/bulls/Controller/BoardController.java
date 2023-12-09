package com.example.bulls.Controller;

import com.example.bulls.DTO.BoardListDTO;
import com.example.bulls.DTO.MatchDTO;
import com.example.bulls.Entity.MatchPost;
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

    @GetMapping("/match/boardlist")
    @ResponseBody
    public List<BoardListDTO> getAllBoards() { // BoardList DTO 에서 값 추출 하기
        return teamService.getAllBoard();
    }

    @GetMapping("/match/boardlist/{id}")
    @ResponseBody // 자바 객체로 받으려고 500문제 해결
    public ResponseEntity<MatchPost> getBoardDetailByID(@PathVariable(value = "id") Integer id) {
        Optional<MatchPost> match = teamService.getBoardDetail(id);
        return ResponseEntity.ok(match.get());
    }


    @PostMapping("/match/addmatch/create")
    @ResponseBody
    public ResponseEntity<String> newArticleAddForm(@Validated @RequestBody MatchDTO matchDTO) {
        Boolean response = teamService.savedBoard(matchDTO);
        if (response) {
            return ResponseEntity.ok("매칭 등록에 성공하였습니다.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("매칭 등록에 실패하였습니다.");
    }

    @PutMapping("/match/addmatch/create/{id}")
    @ResponseBody
    public ResponseEntity<MatchPost> updateBoard(@PathVariable(value = "id") Integer id, @RequestBody MatchDTO matchDTO) {
        return teamService.updateBoard(id, matchDTO);
    }


    @DeleteMapping("/match/boardlist/{id}")
    @ResponseBody
    public void deleteBoardByID(@PathVariable(value = "id") Integer id) {
        teamService.deleteBoard(id);
    }

    @GetMapping("/match/update/{id}")
    @ResponseBody
    public ResponseEntity<String> matchFinished(@PathVariable(value = "id") Integer id) {
        if(teamService.matchFinished(id)) {
            return ResponseEntity.ok("변경 성공.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("변경 실패.");

    }
}
