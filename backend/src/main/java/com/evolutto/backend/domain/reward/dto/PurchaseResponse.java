package com.evolutto.backend.domain.reward.dto;

import com.evolutto.backend.domain.reward.PurchaseStatus;
import com.evolutto.backend.domain.reward.RewardPurchase;
import java.time.LocalDateTime;

public class PurchaseResponse {
    private String id;
    private String rewardTitle;
    private int cost;
    private String adventurerId;
    private String adventurerUsername;
    private PurchaseStatus status;
    private LocalDateTime purchasedAt;

    public PurchaseResponse(RewardPurchase purchase) {
        this.id = purchase.getId();
        this.rewardTitle = purchase.getReward().getTitle();
        this.cost = purchase.getReward().getCost();
        this.adventurerId = purchase.getAdventurer().getId();
        this.adventurerUsername = purchase.getAdventurer().getUsername();
        this.status = purchase.getStatus();
        this.purchasedAt = purchase.getPurchasedAt();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRewardTitle() { return rewardTitle; }
    public void setRewardTitle(String rewardTitle) { this.rewardTitle = rewardTitle; }
    public int getCost() { return cost; }
    public void setCost(int cost) { this.cost = cost; }
    public String getAdventurerId() { return adventurerId; }
    public void setAdventurerId(String adventurerId) { this.adventurerId = adventurerId; }
    public String getAdventurerUsername() { return adventurerUsername; }
    public void setAdventurerUsername(String adventurerUsername) { this.adventurerUsername = adventurerUsername; }
    public PurchaseStatus getStatus() { return status; }
    public void setStatus(PurchaseStatus status) { this.status = status; }
    public LocalDateTime getPurchasedAt() { return purchasedAt; }
    public void setPurchasedAt(LocalDateTime purchasedAt) { this.purchasedAt = purchasedAt; }
}