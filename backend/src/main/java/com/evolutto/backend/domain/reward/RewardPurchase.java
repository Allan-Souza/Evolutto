package com.evolutto.backend.domain.reward;

import com.evolutto.backend.domain.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reward_purchases")
public class RewardPurchase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id", nullable = false)
    private Reward reward;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adventurer_id", nullable = false)
    private User adventurer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PurchaseStatus status;

    @Column(nullable = false)
    private LocalDateTime purchasedAt;

    public RewardPurchase() {}

    public RewardPurchase(Reward reward, User adventurer, PurchaseStatus status, LocalDateTime purchasedAt) {
        this.reward = reward;
        this.adventurer = adventurer;
        this.status = status;
        this.purchasedAt = purchasedAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public Reward getReward() { return reward; }
    public void setReward(Reward reward) { this.reward = reward; }
    public User getAdventurer() { return adventurer; }
    public void setAdventurer(User adventurer) { this.adventurer = adventurer; }
    public PurchaseStatus getStatus() { return status; }
    public void setStatus(PurchaseStatus status) { this.status = status; }
    public LocalDateTime getPurchasedAt() { return purchasedAt; }
    public void setPurchasedAt(LocalDateTime purchasedAt) { this.purchasedAt = purchasedAt; }
}