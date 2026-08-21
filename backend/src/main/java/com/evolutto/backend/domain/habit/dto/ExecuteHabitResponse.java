package com.evolutto.backend.domain.habit.dto;

import com.evolutto.backend.domain.habit.LogStatus;

public class ExecuteHabitResponse {
    private String logId;
    private LogStatus status;
    private int xpRewarded;
    private int coinsRewarded;
    private int newTotalXp;
    private int newTotalCoins;
    private int currentDebuffCounter;

    public String getLogId() { return logId; }
    public void setLogId(String logId) { this.logId = logId; }
    public LogStatus getStatus() { return status; }
    public void setStatus(LogStatus status) { this.status = status; }
    public int getXpRewarded() { return xpRewarded; }
    public void setXpRewarded(int xpRewarded) { this.xpRewarded = xpRewarded; }
    public int getCoinsRewarded() { return coinsRewarded; }
    public void setCoinsRewarded(int coinsRewarded) { this.coinsRewarded = coinsRewarded; }
    public int getNewTotalXp() { return newTotalXp; }
    public void setNewTotalXp(int newTotalXp) { this.newTotalXp = newTotalXp; }
    public int getNewTotalCoins() { return newTotalCoins; }
    public void setNewTotalCoins(int newTotalCoins) { this.newTotalCoins = newTotalCoins; }
    public int getCurrentDebuffCounter() { return currentDebuffCounter; }
    public void setCurrentDebuffCounter(int currentDebuffCounter) { this.currentDebuffCounter = currentDebuffCounter; }
}