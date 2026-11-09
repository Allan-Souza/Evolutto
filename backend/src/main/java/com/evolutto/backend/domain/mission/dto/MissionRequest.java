package com.evolutto.backend.domain.mission.dto;

import com.evolutto.backend.domain.mission.MissionType;

import java.util.List;

public class MissionRequest {
    private String title;
    private String description;
    private MissionType type;
    private int totalSteps;
    private int xpReward;
    private int coinReward;
    private List<String> relatedHabitIds;
    private String targetId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public MissionType getType() { return type; }
    public void setType(MissionType type) { this.type = type; }

    public int getTotalSteps() { return totalSteps; }
    public void setTotalSteps(int totalSteps) { this.totalSteps = totalSteps; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }

    public int getCoinReward() { return coinReward; }
    public void setCoinReward(int coinReward) { this.coinReward = coinReward; }

    public List<String> getRelatedHabitIds() { return relatedHabitIds; }
    public void setRelatedHabitIds(List<String> relatedHabitIds) { this.relatedHabitIds = relatedHabitIds; }

    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
}

