package com.FINORA.BACKEND.controller;

import com.FINORA.BACKEND.model.User;
import com.FINORA.BACKEND.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // 🧍 Registrar usuario
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    // 🔐 Login
    @PostMapping("/login")
    public Optional<User> login(@RequestBody User loginRequest) {
        return service.login(loginRequest.getEmail(), loginRequest.getPassword());
    }

    // 📋 Listar todos los usuarios
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAll();
    }

    // 🔎 Obtener usuario por ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return service.getById(id);
    }

    // 🧠 Endpoint de prueba
    @GetMapping("/ping")
    public String ping() {
        return "✅ Servidor activo y base de datos funcionando correctamente";
    }
}
