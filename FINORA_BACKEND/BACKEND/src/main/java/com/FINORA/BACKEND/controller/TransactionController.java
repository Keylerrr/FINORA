package com.FINORA.BACKEND.controller;

import com.FINORA.BACKEND.model.Transaction;
import com.FINORA.BACKEND.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // 💰 Crear transacción
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return service.create(transaction);
    }

    // 📋 Obtener todas
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAll();
    }

    // 🔎 Obtener por ID
    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Long id) {
        return service.getById(id);
    }

    // 📂 Obtener por usuario
    @GetMapping("/user/{userId}")
    public List<Transaction> getTransactionsByUser(@PathVariable Long userId) {
        return service.getByUser(userId);
    }

    // ✏️ Actualizar transacción
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction) {
        return service.update(id, transaction);
    }

    // 🗑️ Eliminar
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        service.delete(id);
    }

    // 🚀 Prueba
    @GetMapping("/ping")
    public String ping() {
        return "✅ Endpoint de transacciones funcionando correctamente";
    }
}
