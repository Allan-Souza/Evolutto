package com.evolutto.backend.domain.parental;

import com.evolutto.backend.domain.parental.dto.AdventurerSummaryResponse;
import com.evolutto.backend.domain.parental.dto.HabitLogResponse;
import com.evolutto.backend.domain.habit.HabitLogRepository;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import com.evolutto.backend.domain.user.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ParentalService {

    private final UserRepository userRepository;
    private final HabitLogRepository habitLogRepository;

    public ParentalService(UserRepository userRepository, HabitLogRepository habitLogRepository) {
        this.userRepository = userRepository;
        this.habitLogRepository = habitLogRepository;
    }

    @Transactional
    public AdventurerSummaryResponse linkAdventurer(String guardianId, String adventurerUsername) {
        User guardian = userRepository.findById(guardianId)
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        if (guardian.getRole() != UserRole.GUARDIAN) {
            throw new RuntimeException("Only guardians can link adventurers.");
        }

        User adventurer = userRepository.findByUsername(adventurerUsername)
                .orElseThrow(() -> new RuntimeException("Adventurer username not found"));

        if (adventurer.getRole() != UserRole.ADVENTURER) {
            throw new RuntimeException("User is not an adventurer.");
        }

        // Estabelece a ligaÃƒÂ§ÃƒÂ£o
        adventurer.setGuardian(guardian);
        userRepository.save(adventurer);

        return new AdventurerSummaryResponse(adventurer);
    }

    public List<AdventurerSummaryResponse> getMyAdventurers(String guardianId) {
        User guardian = userRepository.findById(guardianId)
                .orElseThrow(() -> new RuntimeException("Guardian not found"));

        return guardian.getAdventurers().stream()
                .map(AdventurerSummaryResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void pardonDebuff(String guardianId, String adventurerId) {
        User adventurer = userRepository.findById(adventurerId)
                .orElseThrow(() -> new RuntimeException("Adventurer not found"));

        if (adventurer.getGuardian() == null || !adventurer.getGuardian().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized: You are not the guardian of this adventurer.");
        }

        // Zera o debuff
        adventurer.setDebuffCounter(0);
        userRepository.save(adventurer);
    }
        @Transactional
    public List<HabitLogResponse> getAdventurerLogs(String guardianId, String adventurerId) {
        User adventurer = userRepository.findById(adventurerId)
                .orElseThrow(() -> new RuntimeException("Adventurer not found"));

        if (adventurer.getGuardian() == null || !adventurer.getGuardian().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized: You are not the guardian of this adventurer.");
        }

        return habitLogRepository.findByUserIdOrderByExecutedAtDesc(adventurerId).stream()
                .map(HabitLogResponse::new)
                .limit(10) // Traz apenas os 10 Ãºltimos para nÃ£o sobrecarregar
                .collect(Collectors.toList());
    }
}