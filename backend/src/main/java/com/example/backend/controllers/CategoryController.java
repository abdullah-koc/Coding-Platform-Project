package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dto.CategoryDto;
import com.example.backend.services.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/category")
public class CategoryController {

   @Autowired
   CategoryService categoryService;

   @PostMapping(path = "/add")
   public void addCategory(@RequestBody CategoryDto categoryName) {
      categoryService.addCategory(categoryName);
   }

   @GetMapping("/all")
   public List<CategoryDto> getAllCategories() {
      return categoryService.getAllCategories();
   }

   @GetMapping("/{category_name}")
   public CategoryDto getCategory(@PathVariable CategoryDto category_name) {
      return categoryService.getCategory(category_name);
   }

   @GetMapping("/delete/{category_name}")
   public void deleteCategory(@PathVariable CategoryDto category_name) {
      categoryService.deleteCategory(category_name);
   }
}
