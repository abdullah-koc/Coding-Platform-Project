package com.example.backend.dto;

public class EditorDto extends PersonDto {
    private String cv;

    public String getCv() {
        return cv;
    }

    public void setCv(String cv_url) {
        this.cv = cv_url;
    }
}
