package com.evolutto.backend.domain.habit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, String> {
    List<Habit> findByUserIdAndIsActiveTrue(String userId);
}