/*package com.FINORA.BACKEND.service;

import com.FINORA.BACKEND.model.Goal;
import com.FINORA.BACKEND.model.User;
import com.FINORA.BACKEND.repository.GoalRepository;
import com.FINORA.BACKEND.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    private final GoalRepository repository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    // Crear meta
    public Goal create(Goal goal) {
        if (goal.getCurrentAmount() == null) {
            goal.setCurrentAmount(0.0);
        }
        return repository.save(goal);
    }

    // Obtener todas las metas
    public List<Goal> getAll() {
        return repository.findAll();
    }

    // Obtener metas por usuario
    public List<Goal> getByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(repository::findByUser).orElse(List.of());
    }

    // Obtener meta por ID
    public Optional<Goal> getById(Long id) {
        return repository.findById(id);
    }

    // Actualizar meta
    public Goal update(Long id, Goal goalDetails) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setTitle(goalDetails.getTitle());
                    existing.setTargetAmount(goalDetails.getTargetAmount());
                    existing.setCurrentAmount(goalDetails.getCurrentAmount());
                    existing.setTargetDate(goalDetails.getTargetDate());
                    existing.setDescription(goalDetails.getDescription());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Goal not found"));
    }

    // Eliminar meta
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
*/