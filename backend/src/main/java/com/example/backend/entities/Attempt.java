package com.example.backend.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Attempt {

    @Id
    private String attempt_id;
    private String user_answer;
    private int try_count;
    private boolean is_solved;
    private String user_id;
    private String question_id;
    private String programming_language;

    public String getAttempt_id() {
        return attempt_id;
    }

    public void setAttempt_id(String attempt_id) {
        this.attempt_id = attempt_id;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public int getTry_count() {
        return try_count;
    }

    public void setTry_count(int try_count) {
        this.try_count = try_count;
    }

    public boolean isIs_solved() {
        return is_solved;
    }

    public void setIs_solved(boolean is_solved) {
        this.is_solved = is_solved;
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

    public String getProgramming_language() {
        return programming_language;
    }

    public void setProgramming_language(String programming_language) {
        this.programming_language = programming_language;
    }

}
