package com.example.backend.entities;

public class CodingQuestion extends Question {
   private String video_link;
   private int request_count;

   // getter and setter functions

   public String getVideo_link() {
      return video_link;
   }

   public void setVideo_link(String video_link) {
      this.video_link = video_link;
   }

   public int getRequest_count() {
      return request_count;
   }

   public void setRequest_count(int request_count) {
      this.request_count = request_count;
   }
}
