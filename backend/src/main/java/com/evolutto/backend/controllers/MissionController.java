package com.evolutto.backend.controllers;

import com.evolutto.backend.domain.mission.MissionService;
import com.evolutto.backend.domain.mission.dto.ClaimMissionResponse;
import com.evolutto.backend.domain.mission.dto.MissionRequest;
import com.evolutto.backend.domain.mission.dto.MissionResponse;
import com.evolutto.backend.domain.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/missions")
@CrossOrigin(origins = "http://localhost:4200")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/me")
    public ResponseEntity<List<MissionResponse>> getMyMissions(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(missionService.getMyMissions(user.getId()));
    }

    @PostMapping
    public ResponseEntity<MissionResponse> createMission(
            @AuthenticationPrincipal User user,
            @RequestBody MissionRequest request) {
        return ResponseEntity.ok(missionService.createMission(user.getId(), request));
    }

    @PutMapping("/{missionId}")
    public ResponseEntity<MissionResponse> updateMission(
            @AuthenticationPrincipal User user,
            @PathVariable String missionId,
            @RequestBody MissionRequest request) {
        return ResponseEntity.ok(missionService.updateMission(user.getId(), missionId, request));
    }

    @DeleteMapping("/{missionId}")
    public ResponseEntity<Void> deleteMission(
            @AuthenticationPrincipal User user,
            @PathVariable String missionId) {
        missionService.deleteMission(user.getId(), missionId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{missionId}/claim")
    public ResponseEntity<ClaimMissionResponse> claimMission(
            @AuthenticationPrincipal User user,
            @PathVariable String missionId) {
        return ResponseEntity.ok(missionService.claimReward(user.getId(), missionId));
    }
}

