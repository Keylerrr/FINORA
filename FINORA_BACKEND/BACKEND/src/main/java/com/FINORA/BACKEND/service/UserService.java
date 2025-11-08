package com.FINORA.BACKEND.service;

import com.FINORA.BACKEND.model.User;
import com.FINORA.BACKEND.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // Registrar usuario
    public User register(User user) {
        // Aquí podrías encriptar la contraseña (por ejemplo con BCrypt)
        return repository.save(user);
    }

    // Iniciar sesión
    public Optional<User> login(String email, String password) {
        return repository.findByEmail(email)
                         .filter(u -> u.getPassword().equals(password));
    }

    // Listar todos los usuarios
    public List<User> getAll() {
        return repository.findAll();
    }

    // Obtener usuario por ID
    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }
}
