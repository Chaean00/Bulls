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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findByUid(username)
                .orElseThrow(() -> new UsernameNotFoundException("찾을수없습니다.")));

        return new CustomUserDetails(
                optionalUser.get().getUid(),
                optionalUser.get().getPassword(),
                Collections.singleton(new SimpleGrantedAuthority(optionalUser.get().getRoles()))
        );
    }
}
