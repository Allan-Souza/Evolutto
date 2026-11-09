package com.evolutto.backend.domain.mission.dto;

public class ClaimMissionResponse {
    private String missionId;
    private int xpRewarded;
    private int coinsRewarded;
    private int newTotalXp;
    private int newTotalCoins;
    private int newLevel;
    private int currentDebuffCounter;

    public ClaimMissionResponse() {}

    public ClaimMissionResponse(String missionId, int xpRewarded, int coinsRewarded,
                                int newTotalXp, int newTotalCoins, int newLevel, int currentDebuffCounter) {
        this.missionId = missionId;
        this.xpRewarded = xpRewarded;
        this.coinsRewarded = coinsRewarded;
        this.newTotalXp = newTotalXp;
        this.newTotalCoins = newTotalCoins;
        this.newLevel = newLevel;
        this.currentDebuffCounter = currentDebuffCounter;
    }

    public String getMissionId() { return missionId; }
    public void setMissionId(String missionId) { this.missionId = missionId; }

    public int getXpRewarded() { return xpRewarded; }
    public void setXpRewarded(int xpRewarded) { this.xpRewarded = xpRewarded; }

    public int getCoinsRewarded() { return coinsRewarded; }
    public void setCoinsRewarded(int coinsRewarded) { this.coinsRewarded = coinsRewarded; }

    public int getNewTotalXp() { return newTotalXp; }
    public void setNewTotalXp(int newTotalXp) { this.newTotalXp = newTotalXp; }

    public int getNewTotalCoins() { return newTotalCoins; }
    public void setNewTotalCoins(int newTotalCoins) { this.newTotalCoins = newTotalCoins; }

    public int getNewLevel() { return newLevel; }
    public void setNewLevel(int newLevel) { this.newLevel = newLevel; }

    public int getCurrentDebuffCounter() { return currentDebuffCounter; }
    public void setCurrentDebuffCounter(int currentDebuffCounter) { this.currentDebuffCounter = currentDebuffCounter; }
}

