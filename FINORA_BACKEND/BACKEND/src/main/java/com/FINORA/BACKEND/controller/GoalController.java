package com.FINORA.BACKEND.controller;

import com.FINORA.BACKEND.model.Goal;
import com.FINORA.BACKEND.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class GoalController {

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    // 🎯 Crear meta
    @PostMapping
    public Goal createGoal(@RequestBody Goal goal) {
        return service.create(goal);
    }

    // 📋 Obtener todas
    @GetMapping
    public List<Goal> getAllGoals() {
        return service.getAll();
    }

    // 🔍 Obtener por ID
    @GetMapping("/{id}")
    public Optional<Goal> getGoalById(@PathVariable Long id) {
        return service.getById(id);
    }

    // 👤 Obtener por usuario
    @GetMapping("/user/{userId}")
    public List<Goal> getGoalsByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    // ✏️ Actualizar meta
    @PutMapping("/{id}")
    public Goal updateGoal(@PathVariable Long id, @RequestBody Goal goal) {
        return service.update(id, goal);
    }

    // 🗑️ Eliminar meta
    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        service.delete(id);
    }

    // 🚀 Endpoint de prueba
    @GetMapping("/ping")
    public String ping() {
        return "✅ Endpoint de metas funcionando correctamente";
    }
}
