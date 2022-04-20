package com.example.backend.dto;

import java.sql.Date;

public class QuestionDto {
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
   private String video_link;
   private int video_request_count;
   private String type_description;

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

   public String getVideo_link() {
      return video_link;
   }

   public void setVideo_link(String video_link) {
      this.video_link = video_link;
   }

   public int getVideo_request_count() {
      return video_request_count;
   }

   public void setVideo_request_count(int video_request_count) {
      this.video_request_count = video_request_count;
   }

   public String getType_description() {
      return type_description;
   }

   public void setType_description(String type_description) {
      this.type_description = type_description;
   }
}
