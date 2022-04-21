package com.example.backend.entities;

import java.sql.Date;

import javax.persistence.Entity;

public class Question {
   private String question_id;
   private String title;
   private String explanation;
   private int question_duration;
   private String difficulty;
   private int question_point;
   private String solution;
   private int max_try;
   private int like_count;
   private int dislike_count;
   private Date creation_date;
   private String editor_id;
   private String company_id;

   public Question(String string, String string2, String string3, int int1, String string4, int int2, String string5,
         int int3, int int4, int int5, Date date) {
   }

   public Question() {
   }

   // getter and setter functions
   public String getQuestion_id() {
      return question_id;
   }

   public void setQuestion_id(String question_id) {
      this.question_id = question_id;
   }

   public String getTitle() {
      return title;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getExplanation() {
      return explanation;
   }

   public void setExplanation(String explanation) {
      this.explanation = explanation;
   }

   public int getQuestion_duration() {
      return question_duration;
   }

   public void setQuestion_duration(int question_duration) {
      this.question_duration = question_duration;
   }

   public String getDifficulty() {
      return difficulty;
   }

   public void setDifficulty(String difficulty) {
      this.difficulty = difficulty;
   }

   public int getQuestion_point() {
      return question_point;
   }

   public void setQuestion_point(int question_point) {
      this.question_point = question_point;
   }

   public String getSolution() {
      return solution;
   }

   public void setSolution(String solution) {
      this.solution = solution;
   }

   public int getMax_try() {
      return max_try;
   }

   public void setMax_try(int max_try) {
      this.max_try = max_try;
   }

   public int getLike_count() {
      return like_count;
   }

   public void setLike_count(int like_count) {
      this.like_count = like_count;
   }

   public int getDislike_count() {
      return dislike_count;
   }

   public void setDislike_count(int dislike_count) {
      this.dislike_count = dislike_count;
   }

   public Date getCreation_date() {
      return creation_date;
   }

   public void setCreation_date(Date creation_date) {
      this.creation_date = creation_date;
   }

   public String getEditor_id() {
      return editor_id;
   }

   public void setEditor_id(String editor_id) {
      this.editor_id = editor_id;
   }

   public String getCompany_id() {
      return company_id;
   }

   public void setCompany_id(String company_id) {
      this.company_id = company_id;
   }
}
