package com.evolutto.backend.domain.habit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, String> {
    List<HabitLog> findByUserIdOrderByExecutedAtDesc(String userId);
}