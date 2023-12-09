package com.example.bulls.Controller;

import com.example.bulls.DTO.*;
import com.example.bulls.Entity.User;
import com.example.bulls.JWT.JwtProvider;
import com.example.bulls.Repository.UserRepository;
import com.example.bulls.Service.UserService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@Slf4j
public class UserController {
    private UserService userService;
    private UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtProvider jwtProvider;


    @Autowired
    public UserController(UserService userService, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtProvider jwtProvider) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtProvider = jwtProvider;
    }

    // 회원가입
    @PostMapping("/user/new")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {

        User user = userService.join(userDTO);

        return ResponseEntity.ok(user); // 상태코드: 200 + user
    }

    // 로그인
    @PostMapping("/user/signin")
    public ResponseEntity<TokenDTO> signin(@Valid @RequestBody SigninDTO signinDTO) {
        TokenDTO tokenDTO = userService.signin(signinDTO.getUid(), signinDTO.getPassword());
        if (tokenDTO != null) {
            log.info("로그인 성공! - Controller");
            return ResponseEntity.ok(tokenDTO);
        }
        // 로그인 실패
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 400
    }


    // 로그인한 유저의 정보를 반환
    @GetMapping("/user/info")
    public ResponseEntity<UserInfoDTO> Userinfo() {
        UserInfoDTO userInfo = userService.userInfo();
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 400
        }
        return ResponseEntity.ok(userInfo); // 상태코드: 200 + user
    }


    // 유저 소개 업데이트
    @PostMapping("/user/updateintroduce")
    public ResponseEntity<String> updateIntroduce(@Valid @RequestBody IntroduceDTO introduceDTO) {
        String introduce = userService.updateIntroduce(introduceDTO);
        if (introduce == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 상태코드: 200
        }

        return ResponseEntity.ok(introduce);
    }
}
