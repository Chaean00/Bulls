package com.example.bulls.JWT;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter { // OncePerRequestFilter : 매번 들어갈 때 마다 체크 해주는 필터

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 토큰 추출
        String AccessToken = resolveToken(request);

        // token의 유효성 검사
        if (AccessToken != null && "ACCESS".equals(jwtProvider.validateToken(AccessToken))) {
            Authentication authentication = jwtProvider.getAuthentication(AccessToken);
            // 권한부여
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("권한 부여 성공");
        } else if (AccessToken != null && "EXPIRED".equals(jwtProvider.validateToken(AccessToken))) { // access token 만료
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Error
            response.getWriter().write("Access Token이 만료되었습니다.");
            log.info("Access Token이 만료되었습니다.");
            return;
        }
        filterChain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String auth = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (auth == null) { // Header의 Authorization 값이 비어있으면 => Jwt Token을 전송하지 않음 => 로그인 하지 않음
            return null;
        }
        if (!auth.startsWith("Bearer ")) { // Header의 Authorization 값이 'Bearer '로 시작하지 않으면 => 잘못된 토큰
            return null;
        }
        // 전송받은 값에서 'Bearer ' 뒷부분(Jwt Token) 추출
        return auth.substring(7);
    }
}
