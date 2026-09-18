package com.evolutto.backend.domain.parental.dto;

import com.evolutto.backend.domain.user.User;

public class AdventurerSummaryResponse {
    private String id;
    private String username;
    private String avatar;
    private int currentXp;
    private int currentCoins;
    private int level;
    private int debuffCounter;
    private int totalHabitsCompleted;

    public AdventurerSummaryResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.currentXp = user.getCurrentXp();
        this.currentCoins = user.getCurrentCoins();
        this.level = user.getLevel();
        this.debuffCounter = user.getDebuffCounter();
        this.totalHabitsCompleted = user.getTotalHabitsCompleted();
    }

    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getAvatar() { return avatar; }
    public int getCurrentXp() { return currentXp; }
    public int getCurrentCoins() { return currentCoins; }
    public int getLevel() { return level; }
    public int getDebuffCounter() { return debuffCounter; }
    public int getTotalHabitsCompleted() { return totalHabitsCompleted; }
}