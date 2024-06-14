package com.example.bulls.Controller;

import com.example.bulls.DTO.*;
import com.example.bulls.Entity.User;
import com.example.bulls.Service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Slf4j
public class UserController {
    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/user/new")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {

        User user = userService.join(userDTO);

        return ResponseEntity.ok(user); // 상태코드: 200 + user
    }

    // 로그인
    @PostMapping("/user/signin")
    public ResponseEntity<String> signin(@Valid @RequestBody SigninDTO signinDTO) {
        TokenDTO tokenDTO = userService.signin(signinDTO.getUid(), signinDTO.getPassword());
        if (tokenDTO != null) {
            // JWT Access 토큰을 헤더에 담아서 반환
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDTO.getAccess());
            log.info("로그인 성공! - Controller");
            return ResponseEntity.ok().headers(headers).body(tokenDTO.getNickname());
        }
        // 로그인 실패
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 400
    }


    // 로그인한 유저의 정보를 반환
    @GetMapping("/user/info")
    public ResponseEntity<UserDTO> Userinfo() {
        UserDTO userDTO = userService.getUser();
        userDTO.setPassword("IsNotValue");

        if (userDTO.getUid() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 400
        }
        return ResponseEntity.ok(userDTO); // 상태코드: 200 + user
    }


    // 유저 소개 업데이트
    @PutMapping("/user/updateintroduce")
    public ResponseEntity<String> updateIntroduce(@Valid @RequestBody UserDTO userDTO) {
        String introduce = userService.updateIntroduce(userDTO);
        if (introduce == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 200
        }

        return ResponseEntity.ok(introduce);
    }
}
