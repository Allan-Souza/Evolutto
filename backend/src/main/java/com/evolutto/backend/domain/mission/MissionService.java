package com.evolutto.backend.domain.mission;

import com.evolutto.backend.domain.mission.dto.ClaimMissionResponse;
import com.evolutto.backend.domain.mission.dto.MissionRequest;
import com.evolutto.backend.domain.mission.dto.MissionResponse;
import com.evolutto.backend.domain.user.User;
import com.evolutto.backend.domain.user.UserRepository;
import com.evolutto.backend.domain.user.UserRole;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final UserRepository userRepository;

    public MissionService(MissionRepository missionRepository, UserRepository userRepository) {
        this.missionRepository = missionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public MissionResponse createMission(String userId, MissionRequest request) {
        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User target;
        if (creator.getRole() == UserRole.SOLO) {
            if (request.getTargetId() != null && !request.getTargetId().isBlank() && !request.getTargetId().equals(creator.getId())) {
                throw new RuntimeException("Unauthorized: Solo user can only create missions for themselves");
            }
            target = creator;
        } else if (creator.getRole() == UserRole.GUARDIAN) {
            if (request.getTargetId() == null || request.getTargetId().isBlank()) {
                throw new RuntimeException("Adventurer targetId is required");
            }
            target = userRepository.findById(request.getTargetId())
                    .orElseThrow(() -> new RuntimeException("Adventurer not found"));

            if (target.getGuardian() == null || !target.getGuardian().getId().equals(creator.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        } else {
            throw new RuntimeException("Unauthorized: Only Solo users or Guardians can create missions");
        }

        int totalSteps = Math.max(1, request.getTotalSteps());
        int xpReward = Math.max(1, request.getXpReward());
        int coinReward = Math.max(0, request.getCoinReward());
        MissionType type = request.getType() != null ? request.getType() : MissionType.DAILY;

        Mission mission = new Mission(
                creator,
                target,
                request.getTitle(),
                request.getDescription(),
                type,
                totalSteps,
                xpReward,
                coinReward,
                request.getRelatedHabitIds()
        );

        mission = missionRepository.save(mission);
        return new MissionResponse(mission);
    }

    @Transactional
    public MissionResponse updateMission(String userId, String missionId, MissionRequest request) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission not found"));

        if (!mission.getCreator().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        mission.setTitle(request.getTitle());
        mission.setDescription(request.getDescription());
        if (request.getType() != null) {
            mission.setType(request.getType());
        }
        mission.setTotalSteps(Math.max(1, request.getTotalSteps()));
        mission.setXpReward(Math.max(1, request.getXpReward()));
        mission.setCoinReward(Math.max(0, request.getCoinReward()));
        mission.setRelatedHabitIds(request.getRelatedHabitIds());

        if (mission.getStatus() != MissionStatus.CLAIMED) {
            if (mission.getCurrentSteps() >= mission.getTotalSteps()) {
                mission.setCurrentSteps(mission.getTotalSteps());
                mission.setStatus(MissionStatus.COMPLETED);
            } else {
                mission.setStatus(MissionStatus.ACTIVE);
            }
        }

        mission = missionRepository.save(mission);
        return new MissionResponse(mission);
    }

    @Transactional
    public void deleteMission(String userId, String missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission not found"));

        if (!mission.getCreator().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        mission.setActive(false);
        missionRepository.save(mission);
    }

    public List<MissionResponse> getMyMissions(String userId) {
        return missionRepository.findByTargetIdAndIsActiveTrue(userId).stream()
                .map(MissionResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void incrementProgressForHabit(String userId, String habitId) {
        List<Mission> activeMissions = missionRepository.findByTargetIdAndStatusAndIsActiveTrue(userId, MissionStatus.ACTIVE);

        for (Mission mission : activeMissions) {
            List<String> related = mission.getRelatedHabitIds();
            boolean matches = (related == null || related.isEmpty() || related.contains(habitId));
            if (matches) {
                int nextSteps = Math.min(mission.getCurrentSteps() + 1, mission.getTotalSteps());
                mission.setCurrentSteps(nextSteps);
                if (nextSteps >= mission.getTotalSteps()) {
                    mission.setStatus(MissionStatus.COMPLETED);
                }
                missionRepository.save(mission);
            }
        }
    }

    @Transactional
    public ClaimMissionResponse claimReward(String userId, String missionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission not found"));

        if (!mission.isActive() || !mission.getTarget().getId().equals(userId)) {
            throw new RuntimeException("Mission not available");
        }

        if (mission.getStatus() != MissionStatus.COMPLETED) {
            throw new RuntimeException("Mission is not ready to be claimed");
        }

        mission.setStatus(MissionStatus.CLAIMED);
        missionRepository.save(mission);

        user.setCurrentXp(user.getCurrentXp() + mission.getXpReward());
        user.setCurrentCoins(user.getCurrentCoins() + mission.getCoinReward());

        while (user.getCurrentXp() >= user.getLevel() * 1000) {
            int xpTarget = user.getLevel() * 1000;
            user.setCurrentXp(user.getCurrentXp() - xpTarget);
            user.setLevel(user.getLevel() + 1);
        }

        userRepository.save(user);

        return new ClaimMissionResponse(
                mission.getId(),
                mission.getXpReward(),
                mission.getCoinReward(),
                user.getCurrentXp(),
                user.getCurrentCoins(),
                user.getLevel(),
                user.getDebuffCounter()
        );
    }
}

