package com.evolutto.backend.domain.reward.dto;

import com.evolutto.backend.domain.reward.Reward;

public class RewardResponse {
    private String id;
    private String title;
    private String description;
    private int cost;
    private String targetId;

    public RewardResponse() {}

    public RewardResponse(Reward reward) {
        this.id = reward.getId();
        this.title = reward.getTitle();
        this.description = reward.getDescription();
        this.cost = reward.getCost();
        this.targetId = reward.getTarget().getId();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getCost() { return cost; }
    public void setCost(int cost) { this.cost = cost; }
    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
}