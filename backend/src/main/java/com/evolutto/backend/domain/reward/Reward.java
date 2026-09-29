package com.evolutto.backend.domain.reward;

import com.evolutto.backend.domain.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_id", nullable = false)
    private User target;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private int cost;

    @Column(nullable = false)
    private boolean isActive = true;

    public Reward() {}

    public Reward(User creator, User target, String title, String description, int cost) {
        this.creator = creator;
        this.target = target;
        this.title = title;
        this.description = description;
        this.cost = cost;
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
    public int getCost() { return cost; }
    public void setCost(int cost) { this.cost = cost; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}