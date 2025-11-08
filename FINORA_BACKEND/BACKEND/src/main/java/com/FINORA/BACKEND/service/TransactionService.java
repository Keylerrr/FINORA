package com.FINORA.BACKEND.service;

import com.FINORA.BACKEND.model.Transaction;
import com.FINORA.BACKEND.model.User;
import com.FINORA.BACKEND.repository.TransactionRepository;
import com.FINORA.BACKEND.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository repository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    // Crear transacción
    public Transaction create(Transaction transaction) {
        return repository.save(transaction);
    }

    // Obtener todas las transacciones
    public List<Transaction> getAll() {
        return repository.findAll();
    }

    // Obtener transacciones de un usuario específico
    public List<Transaction> getByUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(repository::findByUser).orElse(List.of());
    }

    // Obtener transacción por ID
    public Optional<Transaction> getById(Long id) {
        return repository.findById(id);
    }

    // Actualizar transacción
    public Transaction update(Long id, Transaction transactionDetails) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setAmount(transactionDetails.getAmount());
                    existing.setDescription(transactionDetails.getDescription());
                    existing.setCategory(transactionDetails.getCategory());
                    existing.setType(transactionDetails.getType());
                    existing.setDate(transactionDetails.getDate());
                    existing.setUser(transactionDetails.getUser());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    // Eliminar transacción
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
