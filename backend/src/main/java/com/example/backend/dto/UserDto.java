package com.example.backend.dto;

public class UserDto extends PersonDto {
   private String school;
   private String department;
   private String cur_company;
   private String success_rate;
   private String user_point;

   public String getSchool() {
      return school;
   }

   public void setSchool(String school) {
      this.school = school;
   }

   public String getDepartment() {
      return department;
   }

   public void setDepartment(String department) {
      this.department = department;
   }

   public String getCur_company() {
      return cur_company;
   }

   public void setCur_company(String cur_company) {
      this.cur_company = cur_company;
   }

   public String getSuccess_rate() {
      return success_rate;
   }

   public void setSuccess_rate(String success_rate) {
      this.success_rate = success_rate;
   }

   public String getUser_point() {
      return user_point;
   }

   public void setUser_point(String user_point) {
      this.user_point = user_point;
   }
}
