package com.FINORA.BACKEND.repository;

import com.FINORA.BACKEND.model.Transaction;
import com.FINORA.BACKEND.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}
