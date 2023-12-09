package com.example.bulls.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // 409에러
public class AlreadyRegisteredUserException extends RuntimeException {
    public AlreadyRegisteredUserException(String m) {
        super(m);
    }
}
