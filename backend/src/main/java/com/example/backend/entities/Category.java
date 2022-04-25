package com.example.backend.entities;

public class Category {

   private String category_name;

   public Category() {
   }

   public Category(String string) {
      this.category_name = string;
   }

   public String getCategory_name() {
      return category_name;
   }

   public void setCategory_name(String category_name) {
      this.category_name = category_name;
   }

}
