package com.example.backend.dto;

public class CategoryDto {
   private String category_name;

   public CategoryDto() {
   }

   public CategoryDto(String string) {
      this.category_name = string;
   }

   public String getCategory_name() {
      return category_name;
   }

   public void setCategory_name(String category_name) {
      this.category_name = category_name;
   }

}
