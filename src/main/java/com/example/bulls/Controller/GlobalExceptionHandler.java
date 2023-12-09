package com.example.bulls.Controller;

import com.example.bulls.Exception.AlreadyRegisteredTeamException;
import com.example.bulls.Exception.AlreadyRegisteredUserException;
import com.example.bulls.Exception.SigninException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyRegisteredTeamException.class)
    public ResponseEntity<String> handleAlreadyRegisteredTeamException(AlreadyRegisteredTeamException e) {
        // 400 에러 -> 이미 존재하는(등록된) 팀
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AlreadyRegisteredUserException.class)
    public ResponseEntity<String> handleAlreadyRegisteredUserException(AlreadyRegisteredUserException e) {
        // 409 에러 -> 이미 팀을 등록한 유저
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(SigninException.class)
    public ResponseEntity<String> handleSigninException(SigninException e) {
        // 400에러 -> 로그인 실패
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidException(MethodArgumentNotValidException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
