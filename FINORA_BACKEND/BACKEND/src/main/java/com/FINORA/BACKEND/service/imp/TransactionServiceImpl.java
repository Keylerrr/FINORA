/*package com.FINORA.BACKEND.service.imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.FINORA.BACKEND.repository.TransactionRepository;
import com.FINORA.BACKEND.service.TransactionService;
import com.FINORA.BACKEND.model.Transaction;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;

    @Override
    public List<Transaction> getTransactions(String userId) {
        return repository.findByUserIdOrderByDateDesc(userId);
    }

    @Override
    public Transaction save(Transaction transaction) {
        return repository.save(transaction);
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
*/