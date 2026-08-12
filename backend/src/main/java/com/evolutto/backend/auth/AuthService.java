package com.evolutto.backend.auth;

import com.evolutto.backend.auth.dto.AuthResponse;
import com.evolutto.backend.auth.dto.LoginRequest;
import com.evolutto.backend.auth.dto.RegisterRequest;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import com.evolutto.backend.domain.user.UserRole;
import com.evolutto.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Este nome de usuário já está em uso.");
        }

        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .avatar(request.role() == UserRole.GUARDIAN ? "lucideShield" : "lucideUser")
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getId(), user.getUsername(), user.getRole().name());

        return buildAuthResponse(token, user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new IllegalArgumentException("Usuário ou senha incorretos."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Usuário ou senha incorretos.");
        }

        String token = jwtService.generateToken(user.getId(), user.getUsername(), user.getRole().name());

        return buildAuthResponse(token, user);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return new AuthResponse(
                token,
                new AuthResponse.UserProfile(
                        user.getId(),
                        user.getUsername(),
                        user.getRole(),
                        user.getAvatar(),
                        user.getCurrentXp(),
                        user.getCurrentCoins(),
                        user.getLevel(),
                        user.getDebuffCounter(),
                        user.getShopStatus(),
                        user.getTotalHabitsCompleted()
                )
        );
    }
}
