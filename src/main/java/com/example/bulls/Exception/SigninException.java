package com.example.bulls.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 400에러
public class SigninException extends RuntimeException {
    public SigninException(String m) {
        super(m);
    }
}
