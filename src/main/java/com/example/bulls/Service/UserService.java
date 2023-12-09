package com.example.bulls.Service;

import com.example.bulls.DTO.TokenDTO;
import com.example.bulls.DTO.IntroduceDTO;
import com.example.bulls.DTO.UserDTO;
import com.example.bulls.DTO.UserInfoDTO;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.bulls.Config.CustomUserDetails;

import java.util.Arrays;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private JwtProvider jwtProvider;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtProvider = jwtProvider;
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
        // 인증객체 생성용
        String uId = optionalUser.get().getUid();
        String pas = optionalUser.get().getPassword();

        // ToeknDTO용
        String name = optionalUser.get().getName();
        String nickname = optionalUser.get().getNickname();
        String email = optionalUser.get().getEmail();

        // 인증 객체 생성
        UserDetails userDetails = new com.example.bulls.Config.CustomUserDetails(uId, pas, Arrays.asList(new SimpleGrantedAuthority(optionalUser.get().getRoles())));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());

        // jwt 발급
        String accessToken = jwtProvider.createToken(authentication);

        return TokenDTO.builder()
                .access(accessToken)
                .nickname(nickname)
                .build();
    }

    // 로그인한 유저 정보 반환
    public UserInfoDTO userInfo() {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            User user = userRepository.findByUid(uid).get();

            return UserInfoDTO.builder()
                    .uid(user.getUid())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .introduce(user.getIntroduce())
                    .email(user.getEmail())
                    .build();
        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }

    }

    // 유저 소개 업데이트
    public String updateIntroduce(IntroduceDTO introduceDTO) {
        Optional<User> optionalUser = userRepository.findByUid(introduceDTO.getUid());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setIntroduce(introduceDTO.getIntroduce());
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

