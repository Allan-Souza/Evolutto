package com.evolutto.backend.controllers;

import com.evolutto.backend.domain.habit.HabitService;
import com.evolutto.backend.domain.habit.dto.CreateHabitRequest;
import com.evolutto.backend.domain.habit.dto.ExecuteHabitResponse;
import com.evolutto.backend.domain.habit.dto.HabitResponse;
import com.evolutto.backend.domain.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/habits")
public class HabitController {

    private final HabitService habitService;

    public HabitController(HabitService habitService) {
        this.habitService = habitService;
    }

    @PostMapping
    public ResponseEntity<HabitResponse> createHabit(@AuthenticationPrincipal User user, @RequestBody CreateHabitRequest request) {
        HabitResponse response = habitService.createHabit(user.getId(), request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<HabitResponse>> getMyHabits(@AuthenticationPrincipal User user) {
        List<HabitResponse> habits = habitService.getHabitsByUserId(user.getId());
        return ResponseEntity.ok(habits);
    }

    @PostMapping("/{habitId}/execute")
    public ResponseEntity<ExecuteHabitResponse> executeHabit(@AuthenticationPrincipal User user, @PathVariable String habitId) {
        ExecuteHabitResponse response = habitService.executeHabit(user.getId(), habitId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{habitId}")
    public ResponseEntity<HabitResponse> updateHabit(@AuthenticationPrincipal User user, @PathVariable String habitId, @RequestBody CreateHabitRequest request) {
        HabitResponse response = habitService.updateHabit(user.getId(), habitId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{habitId}")
    public ResponseEntity<Void> deleteHabit(@AuthenticationPrincipal User user, @PathVariable String habitId) {
        habitService.deleteHabit(user.getId(), habitId);
        return ResponseEntity.noContent().build();
    }
}
