package com.evolutto.backend.domain.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(length = 50)
    @Builder.Default
    private String avatar = "lucideUser";

    // ===== Atributos de RPG =====

    @Builder.Default
    private int currentXp = 0;

    @Builder.Default
    private int currentCoins = 0;

    @Builder.Default
    private int level = 1;

    @Builder.Default
    private int debuffCounter = 0;

    @Column(length = 20)
    @Builder.Default
    private String shopStatus = "ACTIVE"; // ACTIVE | FROZEN

    @Builder.Default
    private int totalHabitsCompleted = 0;
}
