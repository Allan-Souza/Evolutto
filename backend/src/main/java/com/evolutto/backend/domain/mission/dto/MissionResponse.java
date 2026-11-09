package com.evolutto.backend.domain.mission.dto;

import com.evolutto.backend.domain.mission.Mission;
import com.evolutto.backend.domain.mission.MissionStatus;
import com.evolutto.backend.domain.mission.MissionType;

import java.util.ArrayList;
import java.util.List;

public class MissionResponse {
    private String id;
    private String title;
    private String description;
    private MissionType type;
    private int currentSteps;
    private int totalSteps;
    private int xpReward;
    private int coinReward;
    private MissionStatus status;
    private List<String> relatedHabitIds;
    private String targetId;

    public MissionResponse() {}

    public MissionResponse(Mission mission) {
        this.id = mission.getId();
        this.title = mission.getTitle();
        this.description = mission.getDescription();
        this.type = mission.getType();
        this.currentSteps = mission.getCurrentSteps();
        this.totalSteps = mission.getTotalSteps();
        this.xpReward = mission.getXpReward();
        this.coinReward = mission.getCoinReward();
        this.status = mission.getStatus();
        this.relatedHabitIds = mission.getRelatedHabitIds() != null
                ? new ArrayList<>(mission.getRelatedHabitIds())
                : new ArrayList<>();
        this.targetId = mission.getTarget().getId();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public MissionType getType() { return type; }
    public void setType(MissionType type) { this.type = type; }

    public int getCurrentSteps() { return currentSteps; }
    public void setCurrentSteps(int currentSteps) { this.currentSteps = currentSteps; }

    public int getTotalSteps() { return totalSteps; }
    public void setTotalSteps(int totalSteps) { this.totalSteps = totalSteps; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }

    public int getCoinReward() { return coinReward; }
    public void setCoinReward(int coinReward) { this.coinReward = coinReward; }

    public MissionStatus getStatus() { return status; }
    public void setStatus(MissionStatus status) { this.status = status; }

    public List<String> getRelatedHabitIds() { return relatedHabitIds; }
    public void setRelatedHabitIds(List<String> relatedHabitIds) { this.relatedHabitIds = relatedHabitIds; }

    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
}

