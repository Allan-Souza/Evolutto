package com.evolutto.backend.domain.habit;

import com.evolutto.backend.domain.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "habits")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HabitDifficulty difficulty;

    @Column(nullable = false)
    private boolean isActive = true;

    @Column(nullable = false)
    private int streak = 0;

    public Habit() {
    }

    public Habit(User user, String title, String description, HabitType type, HabitDifficulty difficulty) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.type = type;
        this.difficulty = difficulty;
        this.isActive = true;
        this.streak = 0;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HabitType getType() {
        return type;
    }

    public void setType(HabitType type) {
        this.type = type;
    }

    public HabitDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(HabitDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public int getStreak() {
        return streak;
    }

    public void setStreak(int streak) {
        this.streak = streak;
    }
}