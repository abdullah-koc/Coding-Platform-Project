package com.example.backend.dto;

public class ContestResultDto {
   String nickname;
   int point;

   public String getNickname() {
      return nickname;
   }

   public void setNickname(String nickname) {
      this.nickname = nickname;
   }

   public int getPoint() {
      return point;
   }

   public void setPoint(int i) {
      this.point = i;
   }
}
