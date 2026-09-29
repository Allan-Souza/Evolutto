package com.evolutto.backend.domain.reward;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RewardPurchaseRepository extends JpaRepository<RewardPurchase, String> {
    List<RewardPurchase> findByAdventurerIdOrderByPurchasedAtDesc(String adventurerId);
    List<RewardPurchase> findByRewardCreatorIdOrderByPurchasedAtDesc(String creatorId);
}