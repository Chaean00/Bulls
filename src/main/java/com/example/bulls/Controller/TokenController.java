package com.example.bulls.Controller;

import com.example.bulls.Config.CustomUserDetails;
import com.example.bulls.DTO.TokenDTO;
import com.example.bulls.Entity.User;
import com.example.bulls.JWT.JwtProvider;
import com.example.bulls.Repository.UserRepository;
import com.example.bulls.Service.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Arrays;
import java.util.Optional;

@Controller
@Slf4j
public class TokenController {

    private final JwtProvider jwtProvider;
    private final RedisService redisService;
    private final UserRepository userRepository;

    @Autowired
    public TokenController(JwtProvider jwtProvider, RedisService redisService, UserRepository userRepository) {
        this.jwtProvider = jwtProvider;
        this.redisService = redisService;
        this.userRepository = userRepository;
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

    @PostMapping("/reissue/accesstoken")
    public ResponseEntity<Boolean> reissueRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refresh_token = null;
        for (Cookie cookie : cookies) {
            if ("refresh_token".equals(cookie.getName())) {
                refresh_token = cookie.getValue();
            }
        }

        String uid = jwtProvider.getUid(refresh_token);
        Optional<User> optionalUser = userRepository.findByUid(uid);

        // redis에 있는 RT와 Cookie의 RT가 같을 때
        if (refresh_token.equals(redisService.get(uid))) {
            if ("ACCESS".equals(jwtProvider.validateToken(refresh_token))) { // RT가 유효할 시
                CustomUserDetails customUserDetails = new CustomUserDetails(optionalUser.get().getUid(), optionalUser.get().getPassword(), optionalUser.get().getNickname(), Arrays.asList(new SimpleGrantedAuthority(optionalUser.get().getRoles())));
                Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, "", customUserDetails.getAuthorities());

                TokenDTO tokenDTO = jwtProvider.createToken(authentication);
                HttpHeaders headers = new HttpHeaders();
                headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDTO.getAccess());

                log.info("새로 뽑았다 AT => " + tokenDTO.getAccess());

                return ResponseEntity.ok().headers(headers).body(true);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false); // 상태코드: 401
    }
}
