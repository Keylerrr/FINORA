package com.FINORA.BACKEND.repository;

import com.FINORA.BACKEND.model.Goal;
import com.FINORA.BACKEND.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUser(User user);
}
