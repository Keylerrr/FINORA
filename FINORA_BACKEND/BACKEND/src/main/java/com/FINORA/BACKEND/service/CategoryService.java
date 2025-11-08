package com.FINORA.BACKEND.service;

import com.FINORA.BACKEND.model.Category;
import com.FINORA.BACKEND.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    // Crear o registrar categoría
    public Category create(Category category) {
        return repository.save(category);
    }

    // Obtener todas las categorías
    public List<Category> getAll() {
        return repository.findAll();
    }

    // Obtener categoría por ID
    public Optional<Category> getById(Long id) {
        return repository.findById(id);
    }

    // Actualizar categoría
    public Category update(Long id, Category categoryDetails) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(categoryDetails.getName());
                    existing.setIcon(categoryDetails.getIcon());
                    existing.setColor(categoryDetails.getColor());
                    existing.setType(categoryDetails.getType());
                    return repository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // Eliminar categoría
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
