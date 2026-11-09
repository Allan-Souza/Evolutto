package com.evolutto.backend.domain.mission;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, String> {
    List<Mission> findByTargetIdAndIsActiveTrue(String targetId);
    List<Mission> findByTargetIdAndStatusAndIsActiveTrue(String targetId, MissionStatus status);
}

