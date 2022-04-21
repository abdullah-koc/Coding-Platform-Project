package com.example.backend.dto;

import java.sql.Date;

public class ContestDto {
   private String contest_id;
   private String contest_name;
   private String contest_photo;
   private Date start_date;
   private Date end_date;
   private String prize;
   private Date creation_date;

   // getter and setter functions
   public String getContest_id() {
      return contest_id;
   }

   public void setContest_id(String contest_id) {
      this.contest_id = contest_id;
   }

   public String getContest_name() {
      return contest_name;
   }

   public void setContest_name(String contest_name) {
      this.contest_name = contest_name;
   }

   public String getContest_photo() {
      return contest_photo;
   }

   public void setContest_photo(String contes_photo) {
      this.contest_photo = contes_photo;
   }

   public Date getStart_date() {
      return start_date;
   }

   public void setStart_date(Date start_date) {
      this.start_date = start_date;
   }

   public Date getEnd_date() {
      return end_date;
   }

   public void setEnd_date(Date end_date) {
      this.end_date = end_date;
   }

   public String getPrize() {
      return prize;
   }

   public void setPrize(String prize) {
      this.prize = prize;
   }

   public Date getCreation_time() {
      return creation_date;
   }

   public void setCreation_time(Date creation_date) {
      this.creation_date = creation_date;
   }
}
