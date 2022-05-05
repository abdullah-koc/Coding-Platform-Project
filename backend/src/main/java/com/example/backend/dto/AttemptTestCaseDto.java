package com.example.backend.dto;

public class AttemptTestCaseDto {

    private String attempt_id;
    private String test_case_id;
    private boolean is_passed;

    public String getAttempt_id() {
        return attempt_id;
    }

    public void setAttempt_id(String attempt_id) {
        this.attempt_id = attempt_id;
    }

    public String getTest_case_id() {
        return test_case_id;
    }

    public void setTest_case_id(String test_case_id) {
        this.test_case_id = test_case_id;
    }

    public boolean isIs_passed() {
        return is_passed;
    }

    public void setIs_passed(boolean is_passed) {
        this.is_passed = is_passed;
    }
}
