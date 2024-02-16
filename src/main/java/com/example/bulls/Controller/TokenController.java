package com.example.bulls.Controller;

import com.example.bulls.JWT.JwtProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class TokenController {

    private JwtProvider jwtProvider;

    @Autowired
    public TokenController(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    // 토큰 검증 true -> 인증 O / false -> 인증 X
    @PostMapping("/validatetoken")
    public boolean validatetoken(@Valid @RequestBody String token) {
        if ("ACCESS".equals(jwtProvider.validateToken(token))) {
            return true;
        } else if ("EXPIRED".equals(jwtProvider.validateToken(token))) {
            return false;
        } else {
            return false;
        }

    }
}
