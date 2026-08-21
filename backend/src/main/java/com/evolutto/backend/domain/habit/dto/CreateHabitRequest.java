package com.evolutto.backend.domain.habit.dto;

import com.evolutto.backend.domain.habit.HabitDifficulty;
import com.evolutto.backend.domain.habit.HabitType;

public class CreateHabitRequest {
    private String title;
    private String description;
    private HabitType type;
    private HabitDifficulty difficulty;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public HabitType getType() { return type; }
    public void setType(HabitType type) { this.type = type; }
    public HabitDifficulty getDifficulty() { return difficulty; }
    public void setDifficulty(HabitDifficulty difficulty) { this.difficulty = difficulty; }
}