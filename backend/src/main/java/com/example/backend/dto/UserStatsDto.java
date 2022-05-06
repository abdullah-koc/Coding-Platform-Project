package com.example.backend.dto;

public class UserStatsDto {
    private String nickname;
    private String difficulty;
    private int total;
    private int corrects;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getCorrects() {
        return corrects;
    }

    public void setCorrects(int corrects) {
        this.corrects = corrects;
    }
}
