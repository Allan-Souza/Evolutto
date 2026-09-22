package com.evolutto.backend.controllers;

import com.evolutto.backend.domain.parental.ParentalService;
import com.evolutto.backend.domain.parental.dto.AdventurerSummaryResponse;
import com.evolutto.backend.domain.parental.dto.HabitLogResponse;
import com.evolutto.backend.domain.parental.dto.LinkAdventurerRequest;
import com.evolutto.backend.domain.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parental")
public class ParentalController {

    private final ParentalService parentalService;

    public ParentalController(ParentalService parentalService) {
        this.parentalService = parentalService;
    }

    @PostMapping("/link")
    public ResponseEntity<AdventurerSummaryResponse> linkAdventurer(
            @AuthenticationPrincipal User guardian, 
            @RequestBody LinkAdventurerRequest request) {
        
        AdventurerSummaryResponse response = parentalService.linkAdventurer(guardian.getId(), request.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/adventurers")
    public ResponseEntity<List<AdventurerSummaryResponse>> getMyAdventurers(@AuthenticationPrincipal User guardian) {
        List<AdventurerSummaryResponse> adventurers = parentalService.getMyAdventurers(guardian.getId());
        return ResponseEntity.ok(adventurers);
    }

    @PostMapping("/adventurer/{id}/pardon")
    public ResponseEntity<Void> pardonDebuff(
            @AuthenticationPrincipal User guardian, 
            @PathVariable String id) {
        
        parentalService.pardonDebuff(guardian.getId(), id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/adventurer/{id}/logs")
    public ResponseEntity<List<HabitLogResponse>> getAdventurerLogs(
            @AuthenticationPrincipal User guardian, 
            @PathVariable String id) {
        
        List<HabitLogResponse> logs = parentalService.getAdventurerLogs(guardian.getId(), id);
        return ResponseEntity.ok(logs);
    }
    @PostMapping("/review/{logId}")
    public ResponseEntity<Void> reviewHabit(
            @AuthenticationPrincipal User guardian, 
            @PathVariable String logId,
            @RequestParam boolean approved) {
        
        parentalService.reviewHabit(guardian.getId(), logId, approved);
        return ResponseEntity.ok().build();
    }
}