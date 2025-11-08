/*package com.FINORA.BACKEND.service.imp;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.FINORA.BACKEND.repository.CategoryRepository;
import com.FINORA.BACKEND.service.CategoryService;
import com.FINORA.BACKEND.model.Category;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    @Override
    public List<Category> getAll() {
        return repository.findAll();
    }

    @Override
    public Category create(Category category) {
        return repository.save(category);
    }

    @Override
    public void delete(String id) {
        repository.deleteById(Long.parseLong(id));
    }
}
*/