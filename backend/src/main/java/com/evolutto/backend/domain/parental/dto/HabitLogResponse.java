package com.evolutto.backend.domain.parental.dto;

import com.evolutto.backend.domain.habit.HabitLog;
import com.evolutto.backend.domain.habit.LogStatus;
import java.time.LocalDateTime;

public class HabitLogResponse {
    private String id;
    private String habitTitle;
    private LocalDateTime executedAt;
    private LogStatus status;
    private int xpRewarded;
    private int coinsRewarded;

    public HabitLogResponse(HabitLog log) {
        this.id = log.getId();
        this.habitTitle = log.getHabit().getTitle();
        this.executedAt = log.getExecutedAt();
        this.status = log.getStatus();
        this.xpRewarded = log.getXpRewarded();
        this.coinsRewarded = log.getCoinsRewarded();
    }

    public String getId() { return id; }
    public String getHabitTitle() { return habitTitle; }
    public LocalDateTime getExecutedAt() { return executedAt; }
    public LogStatus getStatus() { return status; }
    public int getXpRewarded() { return xpRewarded; }
    public int getCoinsRewarded() { return coinsRewarded; }
}