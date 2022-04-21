package com.example.backend.dto;

import java.sql.Date;

public class InterviewDto {
   private String company_id;
   private String interview_id;
   private String interview_name;
   private Date interview_date;
   private int interview_duration;

   // getter and setter functions
   public String getCompany_id() {
      return company_id;
   }

   public void setCompany_id(String company_id) {
      this.company_id = company_id;
   }

   public String getInterview_id() {
      return interview_id;
   }

   public void setInterview_id(String interview_id) {
      this.interview_id = interview_id;
   }

   public String getInterview_name() {
      return interview_name;
   }

   public void setInterview_name(String interview_name) {
      this.interview_name = interview_name;
   }

   public Date getInterview_date() {
      return interview_date;
   }

   public void setInterview_date(Date interview_date) {
      this.interview_date = interview_date;
   }

   public int getInterview_duration() {
      return interview_duration;
   }

   public void setInterview_duration(int interview_duration) {
      this.interview_duration = interview_duration;
   }
}
