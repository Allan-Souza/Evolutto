package com.evolutto.backend.domain.user;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
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
    private String avatar = "lucideUser";

    private int currentXp = 0;
    private int currentCoins = 0;
    private int level = 1;
    private int debuffCounter = 0;

    @Column(length = 20)
    private String shopStatus = "ACTIVE";

    private int totalHabitsCompleted = 0;

    public User() {}

    public User(String id, String username, String password, UserRole role, String avatar,
                int currentXp, int currentCoins, int level, int debuffCounter, 
                String shopStatus, int totalHabitsCompleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.avatar = avatar;
        this.currentXp = currentXp;
        this.currentCoins = currentCoins;
        this.level = level;
        this.debuffCounter = debuffCounter;
        this.shopStatus = shopStatus;
        this.totalHabitsCompleted = totalHabitsCompleted;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public int getCurrentXp() { return currentXp; }
    public void setCurrentXp(int currentXp) { this.currentXp = currentXp; }

    public int getCurrentCoins() { return currentCoins; }
    public void setCurrentCoins(int currentCoins) { this.currentCoins = currentCoins; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public int getDebuffCounter() { return debuffCounter; }
    public void setDebuffCounter(int debuffCounter) { this.debuffCounter = debuffCounter; }

    public String getShopStatus() { return shopStatus; }
    public void setShopStatus(String shopStatus) { this.shopStatus = shopStatus; }

    public int getTotalHabitsCompleted() { return totalHabitsCompleted; }
    public void setTotalHabitsCompleted(int totalHabitsCompleted) { this.totalHabitsCompleted = totalHabitsCompleted; }
}
