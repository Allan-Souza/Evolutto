package com.evolutto.backend.controllers;

import com.evolutto.backend.domain.reward.RewardService;
import com.evolutto.backend.domain.reward.dto.PurchaseResponse;
import com.evolutto.backend.domain.reward.dto.RewardRequest;
import com.evolutto.backend.domain.reward.dto.RewardResponse;
import com.evolutto.backend.domain.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rewards")
@CrossOrigin(origins = "http://localhost:4200")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    // --- Guardian Actions ---

    @PostMapping
    public ResponseEntity<RewardResponse> createReward(@AuthenticationPrincipal User guardian, @RequestBody RewardRequest request) {
        return ResponseEntity.ok(rewardService.createReward(guardian.getId(), request));
    }

    @DeleteMapping("/{rewardId}")
    public ResponseEntity<Void> deleteReward(@AuthenticationPrincipal User guardian, @PathVariable String rewardId) {
        rewardService.deleteReward(guardian.getId(), rewardId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pending")
    public ResponseEntity<List<PurchaseResponse>> getPendingPurchases(@AuthenticationPrincipal User guardian) {
        return ResponseEntity.ok(rewardService.getPendingPurchasesForGuardian(guardian.getId()));
    }

    @PostMapping("/purchases/{purchaseId}/deliver")
    public ResponseEntity<Void> deliverReward(@AuthenticationPrincipal User guardian, @PathVariable String purchaseId) {
        rewardService.deliverReward(guardian.getId(), purchaseId);
        return ResponseEntity.ok().build();
    }

    // --- Adventurer Actions ---

    @GetMapping("/me")
    public ResponseEntity<List<RewardResponse>> getMyRewards(@AuthenticationPrincipal User adventurer) {
        return ResponseEntity.ok(rewardService.getRewardsByAdventurer(adventurer.getId()));
    }

    @PostMapping("/{rewardId}/buy")
    public ResponseEntity<PurchaseResponse> buyReward(@AuthenticationPrincipal User adventurer, @PathVariable String rewardId) {
        return ResponseEntity.ok(rewardService.buyReward(adventurer.getId(), rewardId));
    }
}