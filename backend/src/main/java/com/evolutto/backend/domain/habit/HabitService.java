package com.evolutto.backend.domain.habit;

import com.evolutto.backend.domain.habit.dto.CreateHabitRequest;
import com.evolutto.backend.domain.habit.dto.ExecuteHabitResponse;
import com.evolutto.backend.domain.habit.dto.HabitResponse;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HabitService {

    private final HabitRepository habitRepository;
    private final HabitLogRepository habitLogRepository;
    private final UserRepository userRepository;

    public HabitService(HabitRepository habitRepository, HabitLogRepository habitLogRepository, UserRepository userRepository) {
        this.habitRepository = habitRepository;
        this.habitLogRepository = habitLogRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public HabitResponse createHabit(String userId, CreateHabitRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Habit habit = new Habit(user, request.getTitle(), request.getDescription(),
                request.getType(), request.getDifficulty());

        habit = habitRepository.save(habit);
        return new HabitResponse(habit);
    }

    public List<HabitResponse> getHabitsByUserId(String userId) {
        return habitRepository.findByUserIdAndIsActiveTrue(userId).stream()
                .map(HabitResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ExecuteHabitResponse executeHabit(String userId, String habitId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Habit habit = habitRepository.findById(habitId)
                .orElseThrow(() -> new RuntimeException("Habit not found"));

        if (!habit.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        int xpRewarded = 0;
        int coinsRewarded = 0;

        // RPG Engine - Matriz de Recompensa
        if (habit.getType() == HabitType.GOOD) {
            habit.setStreak(habit.getStreak() + 1);
            
            xpRewarded = switch (habit.getDifficulty()) {
                case EASY -> 10;
                case MEDIUM -> 20;
                case HARD -> 30;
            };
            
            coinsRewarded = switch (habit.getDifficulty()) {
                case EASY -> 5;
                case MEDIUM -> 10;
                case HARD -> 15;
            };

            user.setCurrentXp(user.getCurrentXp() + xpRewarded);
            user.setCurrentCoins(user.getCurrentCoins() + coinsRewarded);
            user.setTotalHabitsCompleted(user.getTotalHabitsCompleted() + 1);

            // Level Up Algorithm: Meta = Nível Atual * 1000
            int xpTarget = user.getLevel() * 1000;
            if (user.getCurrentXp() >= xpTarget) {
                user.setLevel(user.getLevel() + 1);
                user.setCurrentXp(user.getCurrentXp() - xpTarget);
            }
        } else {
            // Hábito RUIM (BAD) -> Gera Debuff
            habit.setStreak(0);
            user.setDebuffCounter(user.getDebuffCounter() + 1);
        }

        habitRepository.save(habit);
        userRepository.save(user);

        // Registro de Log (Extrato para o Guardião ver depois)
        HabitLog log = new HabitLog(user, habit, LocalDateTime.now(), LogStatus.COMPLETED, xpRewarded, coinsRewarded);
        log = habitLogRepository.save(log);

        ExecuteHabitResponse response = new ExecuteHabitResponse();
        response.setLogId(log.getId());
        response.setStatus(log.getStatus());
        response.setXpRewarded(xpRewarded);
        response.setCoinsRewarded(coinsRewarded);
        response.setNewTotalXp(user.getCurrentXp());
        response.setNewTotalCoins(user.getCurrentCoins());
        response.setCurrentDebuffCounter(user.getDebuffCounter());

        return response;
    }
}