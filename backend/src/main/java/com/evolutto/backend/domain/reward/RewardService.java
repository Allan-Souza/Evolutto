package com.evolutto.backend.domain.reward;

import com.evolutto.backend.domain.reward.dto.PurchaseResponse;
import com.evolutto.backend.domain.reward.dto.RewardRequest;
import com.evolutto.backend.domain.reward.dto.RewardResponse;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RewardService {

    private final RewardRepository rewardRepository;
    private final RewardPurchaseRepository purchaseRepository;
    private final UserRepository userRepository;

    public RewardService(RewardRepository rewardRepository, RewardPurchaseRepository purchaseRepository, UserRepository userRepository) {
        this.rewardRepository = rewardRepository;
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public RewardResponse createReward(String guardianId, RewardRequest request) {
        User guardian = userRepository.findById(guardianId).orElseThrow(() -> new RuntimeException("Guardian not found"));
        User adventurer = userRepository.findById(request.getTargetId()).orElseThrow(() -> new RuntimeException("Adventurer not found"));

        if (adventurer.getGuardian() == null || !adventurer.getGuardian().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized");
        }

        Reward reward = new Reward(guardian, adventurer, request.getTitle(), request.getDescription(), request.getCost());
        reward = rewardRepository.save(reward);
        return new RewardResponse(reward);
    }

    public List<RewardResponse> getRewardsByAdventurer(String adventurerId) {
        return rewardRepository.findByTargetIdAndIsActiveTrue(adventurerId).stream()
                .map(RewardResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteReward(String guardianId, String rewardId) {
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new RuntimeException("Reward not found"));
        if (!reward.getCreator().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized");
        }
        reward.setActive(false);
        rewardRepository.save(reward);
    }

    @Transactional
    public PurchaseResponse buyReward(String adventurerId, String rewardId) {
        User adventurer = userRepository.findById(adventurerId).orElseThrow(() -> new RuntimeException("Adventurer not found"));
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new RuntimeException("Reward not found"));

        if (!reward.isActive() || !reward.getTarget().getId().equals(adventurerId)) {
            throw new RuntimeException("Reward not available");
        }

        if (adventurer.getCurrentCoins() < reward.getCost()) {
            throw new RuntimeException("Not enough coins");
        }

        // Deduct coins
        adventurer.setCurrentCoins(adventurer.getCurrentCoins() - reward.getCost());
        userRepository.save(adventurer);

        // Generate purchase
        RewardPurchase purchase = new RewardPurchase(reward, adventurer, PurchaseStatus.PENDING_DELIVERY, LocalDateTime.now());
        purchase = purchaseRepository.save(purchase);

        return new PurchaseResponse(purchase);
    }

    public List<PurchaseResponse> getPendingPurchasesForGuardian(String guardianId) {
        return purchaseRepository.findByRewardCreatorIdOrderByPurchasedAtDesc(guardianId).stream()
                .filter(p -> p.getStatus() == PurchaseStatus.PENDING_DELIVERY)
                .map(PurchaseResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deliverReward(String guardianId, String purchaseId) {
        RewardPurchase purchase = purchaseRepository.findById(purchaseId).orElseThrow(() -> new RuntimeException("Purchase not found"));
        
        if (!purchase.getReward().getCreator().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized");
        }

        purchase.setStatus(PurchaseStatus.DELIVERED);
        purchaseRepository.save(purchase);
    }
}