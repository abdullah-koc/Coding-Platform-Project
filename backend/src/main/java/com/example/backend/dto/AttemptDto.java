package com.example.backend.dto;

public class AttemptDto {

    private String user_id;
    private String question_id;
    private String user_answer;
    private String programming_language;

    public AttemptDto() {
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(String question_id) {
        this.question_id = question_id;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public String getProgramming_language() {
        return programming_language;
    }

    public void setProgramming_language(String programming_language) {
        this.programming_language = programming_language;
    }
}
