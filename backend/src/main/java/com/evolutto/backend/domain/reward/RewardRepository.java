package com.evolutto.backend.domain.reward;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RewardRepository extends JpaRepository<Reward, String> {
    List<Reward> findByTargetIdAndIsActiveTrue(String targetId);
    List<Reward> findByCreatorIdAndIsActiveTrue(String creatorId);
}