package com.example.bulls.Service;

import com.example.bulls.DTO.TokenDTO;
import com.example.bulls.DTO.UserDTO;
import com.example.bulls.Entity.User;
import com.example.bulls.Exception.SigninException;
import com.example.bulls.JWT.JwtProvider;
import com.example.bulls.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.bulls.Config.CustomUserDetails;

import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtProvider jwtProvider;

    private final RedisService redisService;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtProvider jwtProvider, RedisService redisService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtProvider = jwtProvider;
        this.redisService = redisService;
    }

    // 회원가입
    public User join(UserDTO userDTO) {
        User user = new User();

        user.setUid(userDTO.getUid());
        // 비밀번호 암호화
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setNickname(userDTO.getNickname());
        user.setIntroduce("본인을 소개해주세요");
        user.setRoles("ROLE_USER"); // 일반유저

        // 이미 존재하는 유저인지? + 존재하는 닉네임인지?
        validateDuplicateMember(user);

        userRepository.save(user);

        return user;
    }

    // 로그인
    public TokenDTO signin(String uid, String password) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUid(uid).orElseThrow(() ->
                new SigninException("존재하지 않는 계정입니다.")));

        if (!bCryptPasswordEncoder.matches(password, optionalUser.get().getPassword())) {
            throw new SigninException("비밀번호가 일치하지 않습니다..");
        }

        // 인증 객체 생성 - id, password, nickname, roles
        CustomUserDetails customUserDetails = new CustomUserDetails(optionalUser.get().getUid(), optionalUser.get().getPassword(), optionalUser.get().getNickname(), Arrays.asList(new SimpleGrantedAuthority(optionalUser.get().getRoles())));
        Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, "", customUserDetails.getAuthorities());

        // 인증 객체를 기반으로 JWT 생성
        TokenDTO tokenDTO = jwtProvider.createToken(authentication);

        // Refresh Token Redis에 저장
        redisService.save(optionalUser.get().getUid(), tokenDTO.getRefresh(), 60, TimeUnit.MINUTES);

        // jwt access 발급
        return tokenDTO;
    }

    // 로그인한 유저 정보 반환
    public UserDTO getUser() {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();

            User user = userRepository.findByUid(uid).get();

            return UserDTO.builder()
                    .uid(user.getUid())
                    .password(user.getPassword())
                    .email(user.getEmail())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .introduce(user.getIntroduce())
                    .build();

        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }

    }

    // 유저 소개 업데이트
    public String updateIntroduce(UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findByUid(userDTO.getUid());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setIntroduce(userDTO.getIntroduce());
            userRepository.save(user);
            return user.getIntroduce();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    // 중복회원 검증
    private void validateDuplicateMember(User user) {
        // 이미 존재하는 회원?
        userRepository.findByUid(user.getUid()).
                ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다");
                });
        // 이미 존재하는 닉네임?
        userRepository.findByNickname(user.getNickname()).
                ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 닉네임입니다.");
                });
    }
}

