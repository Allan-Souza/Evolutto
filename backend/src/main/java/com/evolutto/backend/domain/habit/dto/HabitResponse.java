package com.evolutto.backend.domain.habit.dto;

import com.evolutto.backend.domain.habit.Habit;
import com.evolutto.backend.domain.habit.HabitDifficulty;
import com.evolutto.backend.domain.habit.HabitType;

public class HabitResponse {
    private String id;
    private String title;
    private String description;
    private HabitType type;
    private HabitDifficulty difficulty;
    private boolean isActive;
    private int streak;

    public HabitResponse(Habit habit) {
        this.id = habit.getId();
        this.title = habit.getTitle();
        this.description = habit.getDescription();
        this.type = habit.getType();
        this.difficulty = habit.getDifficulty();
        this.isActive = habit.isActive();
        this.streak = habit.getStreak();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public HabitType getType() { return type; }
    public void setType(HabitType type) { this.type = type; }
    public HabitDifficulty getDifficulty() { return difficulty; }
    public void setDifficulty(HabitDifficulty difficulty) { this.difficulty = difficulty; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }
}