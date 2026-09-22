package com.evolutto.backend.domain.parental;

import com.evolutto.backend.domain.parental.dto.AdventurerSummaryResponse;
import com.evolutto.backend.domain.parental.dto.HabitLogResponse;
import com.evolutto.backend.domain.habit.HabitLogRepository;
import com.evolutto.backend.domain.habit.HabitLog;
import com.evolutto.backend.domain.habit.LogStatus;
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

        // Estabelece a ligaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o
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
                .limit(10) // Traz apenas os 10 ÃƒÂºltimos para nÃƒÂ£o sobrecarregar
                .collect(Collectors.toList());
    }
    @Transactional
    public void reviewHabit(String guardianId, String logId, boolean isApproved) {
        HabitLog log = habitLogRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("Habit log not found"));

        User adventurer = log.getUser();

        if (adventurer.getGuardian() == null || !adventurer.getGuardian().getId().equals(guardianId)) {
            throw new RuntimeException("Unauthorized: You are not the guardian of this adventurer.");
        }

        if (log.getStatus() != LogStatus.PENDING_APPROVAL) {
            throw new RuntimeException("This log is not pending approval.");
        }

        if (isApproved) {
            log.setStatus(LogStatus.COMPLETED);
            
            // Entrega os lucros retidos
            adventurer.setCurrentXp(adventurer.getCurrentXp() + log.getXpRewarded());
            adventurer.setCurrentCoins(adventurer.getCurrentCoins() + log.getCoinsRewarded());
            adventurer.setTotalHabitsCompleted(adventurer.getTotalHabitsCompleted() + 1);

            // Level Up Check
            int xpTarget = adventurer.getLevel() * 1000;
            if (adventurer.getCurrentXp() >= xpTarget) {
                adventurer.setLevel(adventurer.getLevel() + 1);
                adventurer.setCurrentXp(adventurer.getCurrentXp() - xpTarget);
            }
            
            userRepository.save(adventurer);
        } else {
            // Rejeitado, ninguem ganha nada
            log.setStatus(LogStatus.REJECTED);
        }

        habitLogRepository.save(log);
    }
}