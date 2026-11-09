package com.evolutto.backend.domain.mission;

import com.evolutto.backend.domain.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "missions")
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_id", nullable = false)
    private User target;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MissionType type;

    @Column(nullable = false)
    private int currentSteps = 0;

    @Column(nullable = false)
    private int totalSteps;

    @Column(nullable = false)
    private int xpReward;

    @Column(nullable = false)
    private int coinReward;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MissionStatus status = MissionStatus.ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "mission_related_habits", joinColumns = @JoinColumn(name = "mission_id"))
    @Column(name = "habit_id")
    private List<String> relatedHabitIds = new ArrayList<>();

    @Column(nullable = false)
    private boolean isActive = true;

    public Mission() {}

    public Mission(User creator, User target, String title, String description,
                   MissionType type, int totalSteps, int xpReward, int coinReward,
                   List<String> relatedHabitIds) {
        this.creator = creator;
        this.target = target;
        this.title = title;
        this.description = description;
        this.type = type;
        this.totalSteps = totalSteps;
        this.xpReward = xpReward;
        this.coinReward = coinReward;
        if (relatedHabitIds != null) {
            this.relatedHabitIds = new ArrayList<>(relatedHabitIds);
        }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public User getCreator() { return creator; }
    public void setCreator(User creator) { this.creator = creator; }

    public User getTarget() { return target; }
    public void setTarget(User target) { this.target = target; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public MissionType getType() { return type; }
    public void setType(MissionType type) { this.type = type; }

    public int getCurrentSteps() { return currentSteps; }
    public void setCurrentSteps(int currentSteps) { this.currentSteps = currentSteps; }

    public int getTotalSteps() { return totalSteps; }
    public void setTotalSteps(int totalSteps) { this.totalSteps = totalSteps; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }

    public int getCoinReward() { return coinReward; }
    public void setCoinReward(int coinReward) { this.coinReward = coinReward; }

    public MissionStatus getStatus() { return status; }
    public void setStatus(MissionStatus status) { this.status = status; }

    public List<String> getRelatedHabitIds() { return relatedHabitIds; }
    public void setRelatedHabitIds(List<String> relatedHabitIds) {
        this.relatedHabitIds = relatedHabitIds != null ? new ArrayList<>(relatedHabitIds) : new ArrayList<>();
    }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}

