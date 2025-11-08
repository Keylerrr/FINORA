package com.FINORA.BACKEND.controller;

import com.FINORA.BACKEND.model.Category;
import com.FINORA.BACKEND.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // 🏷️ Crear nueva categoría
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return service.create(category);
    }

    // 📋 Listar todas las categorías
    @GetMapping
    public List<Category> getAllCategories() {
        return service.getAll();
    }

    // 🔎 Obtener categoría por ID
    @GetMapping("/{id}")
    public Optional<Category> getCategoryById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✏️ Actualizar categoría
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return service.update(id, category);
    }

    // 🗑️ Eliminar categoría
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        service.delete(id);
    }

    // 🔔 Prueba rápida
    @GetMapping("/ping")
    public String ping() {
        return "✅ Endpoint de categorías funcionando correctamente";
    }
}
