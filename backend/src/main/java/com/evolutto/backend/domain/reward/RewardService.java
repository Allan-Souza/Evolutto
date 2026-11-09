package com.evolutto.backend.domain.reward;

import com.evolutto.backend.domain.reward.dto.PurchaseResponse;
import com.evolutto.backend.domain.reward.dto.RewardRequest;
import com.evolutto.backend.domain.reward.dto.RewardResponse;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import com.evolutto.backend.domain.user.UserRole;
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
    public RewardResponse createReward(String userId, RewardRequest request) {
        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User target;
        if (creator.getRole() == UserRole.SOLO) {
            if (request.getTargetId() != null && !request.getTargetId().isBlank() && !request.getTargetId().equals(creator.getId())) {
                throw new RuntimeException("Unauthorized: Solo user can only create rewards for themselves");
            }
            target = creator;
        } else if (creator.getRole() == UserRole.GUARDIAN) {
            if (request.getTargetId() == null || request.getTargetId().isBlank()) {
                throw new RuntimeException("Adventurer targetId is required");
            }
            target = userRepository.findById(request.getTargetId())
                    .orElseThrow(() -> new RuntimeException("Adventurer not found"));

            if (target.getGuardian() == null || !target.getGuardian().getId().equals(creator.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        } else {
            throw new RuntimeException("Unauthorized: Only Solo users or Guardians can create rewards");
        }

        Reward reward = new Reward(creator, target, request.getTitle(), request.getDescription(), request.getCost());
        reward = rewardRepository.save(reward);
        return new RewardResponse(reward);
    }

    @Transactional
    public RewardResponse updateReward(String userId, String rewardId, RewardRequest request) {
        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new RuntimeException("Reward not found"));

        if (!reward.getCreator().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        reward.setTitle(request.getTitle());
        reward.setDescription(request.getDescription());
        reward.setCost(request.getCost());

        reward = rewardRepository.save(reward);
        return new RewardResponse(reward);
    }

    public List<RewardResponse> getRewardsByAdventurer(String adventurerId) {
        return rewardRepository.findByTargetIdAndIsActiveTrue(adventurerId).stream()
                .map(RewardResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteReward(String userId, String rewardId) {
        Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> new RuntimeException("Reward not found"));
        if (!reward.getCreator().getId().equals(userId)) {
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

        // Solo users are independent (no Guardian delivery needed)
        PurchaseStatus initialStatus = (adventurer.getRole() == UserRole.SOLO || adventurer.getGuardian() == null)
                ? PurchaseStatus.DELIVERED
                : PurchaseStatus.PENDING_DELIVERY;

        RewardPurchase purchase = new RewardPurchase(reward, adventurer, initialStatus, LocalDateTime.now());
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