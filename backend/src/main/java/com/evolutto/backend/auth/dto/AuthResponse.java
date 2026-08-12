package com.evolutto.backend.auth.dto;

import com.evolutto.backend.domain.user.UserRole;

public record AuthResponse(
        String token,
        UserProfile user
) {
    public record UserProfile(
            String id,
            String username,
            UserRole role,
            String avatar,
            int currentXp,
            int currentCoins,
            int level,
            int debuffCounter,
            String shopStatus,
            int totalHabitsCompleted
    ) {}
}
