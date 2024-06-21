package com.example.bulls.Config;

import com.example.bulls.Entity.User;
import com.example.bulls.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /*
    loadUserByUsername에서 Username은 사용자의 ID를 의미.
     */
    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUid(uid)
                .orElseThrow(() -> new UsernameNotFoundException("찾을 수 없습니다.")));

        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("찾을 수 없습니다."));

        return new CustomUserDetails(
                user.getUid(),
                user.getPassword(),
                user.getNickname(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRoles()))
        );
    }
}
