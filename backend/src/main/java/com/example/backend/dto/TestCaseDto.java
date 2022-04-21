package com.example.backend.dto;

public class TestCaseDto {

    private String example_input;
    private String example_output;
    private boolean is_locked;
    private String coding_question_id;

    public String getExample_input() {
        return example_input;
    }

    public void setExample_input(String example_input) {
        this.example_input = example_input;
    }

    public String getExample_output() {
        return example_output;
    }

    public void setExample_output(String example_output) {
        this.example_output = example_output;
    }

    public boolean isIs_locked() {
        return is_locked;
    }

    public void setIs_locked(boolean is_locked) {
        this.is_locked = is_locked;
    }

    public String getCoding_question_id() {
        return coding_question_id;
    }

    public void setCoding_question_id(String coding_question_id) {
        this.coding_question_id = coding_question_id;
    }
}
