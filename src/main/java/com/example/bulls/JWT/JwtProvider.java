package com.example.bulls.JWT;

import com.example.bulls.Config.CustomUserDetails;
import com.example.bulls.Config.CustomUserDetailsService;
import com.example.bulls.DTO.TokenDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtProvider {
    @Value("${jwt.secret_key}")
    private String secretKey;
    @Value("${jwt.expiration_access}")
    private long expiration_access;
    @Value("${jwt.issuer}")
    private String issuer;
    @Value("${jwt.expiration_refresh}")
    private long expiration_refresh;

    private final CustomUserDetailsService customUserDetailsService;


    // 의존성 주입 후 초기화를 수행하는 어노테이션
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public TokenDTO createToken(Authentication authentication) {
        // 권한 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("roles", authorities)
                .setIssuedAt(new Date(System.currentTimeMillis())) // 토큰 발행 시간 정보
                .setExpiration(new Date(System.currentTimeMillis() + expiration_access)) // 유효시간 저장 -> ms단위
//                .signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘
                .signWith(getKey(secretKey), SignatureAlgorithm.HS256)
                .setIssuer(issuer)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .setExpiration(new Date(System.currentTimeMillis() + expiration_refresh))
//                .signWith(SignatureAlgorithm.HS256, secretKey) // 지원 중단
                .signWith(getKey(secretKey), SignatureAlgorithm.HS256)
                .compact();

        return TokenDTO.builder()
                .access(accessToken)
                .refresh(refreshToken)
                .build();
    }

    public String validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getKey(secretKey)).build().parseClaimsJws(token);
            return "ACCESS";
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("유효하지 않은 토큰입니다.", e);
        } catch (ExpiredJwtException e) { // 기한 만료
            log.info("토큰의 기한이 만료되었습니다.");
            return "EXPIRED";
        } catch (UnsupportedJwtException e) {
            log.info("지원하지 않는 알고리즘입니다.", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰의 헤더, 페이로드, 서명 부분이 유효하지 않습니다.", e);
        }
        return null;
    }

    // 토큰에서 아이디 가져오기
    public String getUid(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey(secretKey)).build().parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰에서 인증 정보 추출
    public Authentication getAuthentication(String token) {
        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(getUid(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public SecretKey getKey(String secretKey) {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
}
