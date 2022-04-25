package com.example.backend.repositories;

import java.util.List;

import com.example.backend.dto.CategoryDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {

   @Autowired
   private JdbcTemplate jdbcTemplate;

   public void addCategory(String categoryName) {
      String sql = "INSERT INTO categories (category_name) VALUES (?)";
      jdbcTemplate.update(sql, categoryName);
   }

   public List<CategoryDto> getAllCategories() {
      String sql = "SELECT * FROM categories";
      return jdbcTemplate.query(sql, (rs, rowNum) -> new CategoryDto(rs.getString("category_name")));
   }

   public CategoryDto getCategory(String category_name) {
      String sql = "SELECT * FROM categories WHERE category_name = ?";
      return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new CategoryDto(rs.getString("category_name")),
            category_name);
   }

   public void deleteCategory(String category_name) {
      String sql = "DELETE FROM categories WHERE category_name = ?";
      jdbcTemplate.update(sql, category_name);
   }

}
