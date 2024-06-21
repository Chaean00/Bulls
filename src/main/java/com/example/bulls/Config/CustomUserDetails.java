package com.example.bulls.Config;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;


@ToString
public class CustomUserDetails implements UserDetails {

    private final String uid;
    private final String password;
    @Getter
    private final String nickName;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String uid, String password, String nickName, Collection<? extends GrantedAuthority> authorities) {
        this.uid = uid;
        this.password = password;
        this.nickName = nickName;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.uid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
