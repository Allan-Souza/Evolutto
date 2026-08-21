package com.evolutto.backend.domain.habit;

import com.evolutto.backend.domain.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "habit_logs")
public class HabitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id", nullable = false)
    private Habit habit;

    @Column(nullable = false)
    private LocalDateTime executedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LogStatus status;

    @Column(nullable = false)
    private int xpRewarded;

    @Column(nullable = false)
    private int coinsRewarded;

    public HabitLog() {
    }

    public HabitLog(User user, Habit habit, LocalDateTime executedAt, LogStatus status, int xpRewarded, int coinsRewarded) {
        this.user = user;
        this.habit = habit;
        this.executedAt = executedAt;
        this.status = status;
        this.xpRewarded = xpRewarded;
        this.coinsRewarded = coinsRewarded;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Habit getHabit() {
        return habit;
    }

    public void setHabit(Habit habit) {
        this.habit = habit;
    }

    public LocalDateTime getExecutedAt() {
        return executedAt;
    }

    public void setExecutedAt(LocalDateTime executedAt) {
        this.executedAt = executedAt;
    }

    public LogStatus getStatus() {
        return status;
    }

    public void setStatus(LogStatus status) {
        this.status = status;
    }

    public int getXpRewarded() {
        return xpRewarded;
    }

    public void setXpRewarded(int xpRewarded) {
        this.xpRewarded = xpRewarded;
    }

    public int getCoinsRewarded() {
        return coinsRewarded;
    }

    public void setCoinsRewarded(int coinsRewarded) {
        this.coinsRewarded = coinsRewarded;
    }
}